import yaml
import json
import os
import shutil
from typing import Optional

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel

from deployment import deployment
from service import service
from route import httproute


basePath = os.path.dirname(os.path.abspath(__file__))

# save_dir = "/root/templates/"
# save_dir = f"{basePath}/result"

save_dir = os.environ.get('SAVE_DIR')

app = FastAPI()

class uploadItem(BaseModel):
    name: str
    nickname: str
    description: str
    type: list
    images: list
    port_vals: list
    env_vals: list
    volume_mount_vals: list
    volume_vals: list
    path_prefix: list

@app.get("/template/list")
async def get_template_list():
    template_names = os.listdir(save_dir)

    ret = []
    for template_name in template_names:
        with open(f"{save_dir}/{template_name}/info.json", 'r', encoding='utf-8') as f:
            info = json.load(f)
            
            ret.append([template_name, info])

    return ret

@app.get("/template/get/{item}")
async def get_full_template(item):
    print(f"{save_dir}/{item}")

    ret = {
        "deployment": [],
        "service": [],
        "httproute": []
    }

    if not os.path.exists(f"{save_dir}/{item}"):
        return HTTPException(500, f"There is no template (name: {item})")
    
    for kind in ret.keys():
        for file_name in os.listdir(f"{save_dir}/{item}/{kind}"):
            with open(f"{save_dir}/{item}/{kind}/{file_name}") as f:
                doc = yaml.load(f, Loader=yaml.FullLoader)
                ret[kind].append(doc)
                
    return ret


        

@app.post("/template/create")
async def create_template(body: uploadItem):
    name = body.name
    images = body.images
    port_vals = body.port_vals
    env_vals = body.env_vals
    volume_mount_vals = body.volume_mount_vals
    volume_vals = body.volume_vals
    path_prefixes = body.path_prefix
    nickname = body.nickname
    description = body.description
    type = body.type

    if(name in os.listdir(save_dir)):
        return HTTPException(500, f"{name} is already exist.") 
    
    

    # name = "testns"
    # images = ["test1", "test2"]
    # port_vals = [[(8080, 'TCP')], [(6443, 'TCP')]]
    # env_vals = [[('HOME', '/root')], []]
    # volume_mount_vals = [[('ca', '/root/test')], []]
    # volume_vals = [('ca', '/home/ca.cert', 'File')]
    
    deployment_yamls = [deployment(basePath, name, image, port_val, env_val, volume_mount_val, volume_val) for image, port_val, env_val, volume_mount_val, volume_val in zip(images, port_vals, env_vals, volume_mount_vals, volume_vals)]
    
    service_yamls = [service(basePath, name, image, port_val) for image, port_val in zip(images, port_vals)]

    route_yamls = [httproute(basePath, name, image, port_val, path_prefix) for image, port_val, path_prefix in zip(images, port_vals, path_prefixes)]
    

    

    os.mkdir(f"{save_dir}/{name}")

    info = {"nickname": nickname, "descirption": description, "type": type}
    with open(f"{save_dir}/{name}/info.json", 'w', encoding='utf-8') as f:
        json.dump(info, f)

    os.mkdir(f"{save_dir}/{name}/deployment")
    os.mkdir(f"{save_dir}/{name}/service")
    os.mkdir(f"{save_dir}/{name}/httproute")
    
    for deployment_yaml, image in zip(deployment_yamls, images):
        iname = image.split('/')[1].split(':')[0]
        with open(f"{save_dir}/{name}/deployment/{iname}.yaml", 'w') as f:
            yaml.dump(deployment_yaml, f)

    for service_yaml, image in zip(service_yamls, images):
        iname = image.split('/')[1].split(':')[0]
        with open(f"{save_dir}/{name}/service/{iname}.yaml", 'w') as f:
            yaml.dump(service_yaml, f)
        
    for route_yaml, image in zip(route_yamls, images):    
        iname = image.split('/')[1].split(':')[0]
        with open(f"{save_dir}/{name}/httproute/{iname}.yaml", 'w') as f:
            yaml.dump(route_yaml, f)

    return name


@app.delete("/template/delete/{item}")
async def delete_template(item):
    directory = f"{save_dir}/{item}"
    if os.path.exists(directory):
        shutil.rmtree(directory)
        return f"(name: {item}) removed"
    else:
        return HTTPException(500, f"There is no template (name: {item})") 




        

    
