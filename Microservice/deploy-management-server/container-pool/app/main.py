import os
import time

from fastapi import FastAPI, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from pydantic import BaseModel

from docker_conn import Docker
from git_conn import Git

app = FastAPI()

BASE_DIR = os.getcwd()
load_dotenv(os.path.join(BASE_DIR, ".env"))

token = os.environ["token"]
docker_repo = os.environ["docker_repo"]
username = os.environ["username"]
password = os.environ["password"]



# save_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'github')
save_dir = os.path.join(BASE_DIR, 'github')


git_conn = Git(token, save_dir)
docker_conn = Docker(save_dir, docker_repo, username, password)
    

class uploadItem(BaseModel):
    git_url: str
    image_name: str
    image_tag: str = None
    spec: dict


@app.get("/pool/list")
async def get_image_list():
    images = docker_conn.get_list()
    print(images)
    return images



def docker_task(dir, image_name, image_tag, labels):
    docker_conn.build(dir, image_name, image_tag, labels)
    docker_conn.push(image_name, image_tag)



@app.post("/pool/upload")
async def upload_new_image(item: uploadItem, background_task: BackgroundTasks):

    if(item.image_tag == None):
        item.image_tag = time.strftime("%Y-%m-%d-%H-%M-%S",time.localtime())

    dir = git_conn.git_clone(item.git_url)
    print(dir)
    if dir is None:
        raise HTTPException(status_code=404, detail="git clone failed")
    
    background_task.add_task(docker_task, dir, item.image_name, item.image_tag, item.spec)
    # tag = docker_conn.build(dir, item.image_name, item.image_tag)
    # if tag is None:
    #     raise HTTPException(status_code=500, detail="image build failed")
    
    # if not docker_conn.push(item.image_name, item.image_tag):
    #     raise HTTPException(status_code=500, detail="image push failed to hub")
    
    return {"add job": f"{docker_conn.repo}/{item.image_name}:{item.image_tag}"} 


@app.get("/pool/spec/{repo}/{image}")
async def get_spec(repo, image):
    print(repo+"/"+image)
    spec = docker_conn.inspect(repo+"/"+image)
    if spec != None:
        return spec    
    return HTTPException(500, f"There is no template (name: {image})")

