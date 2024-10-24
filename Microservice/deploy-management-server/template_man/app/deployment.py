import yaml
import os
from typing import Optional


def port_gen(port_vals):
    ports = []
    for port, protocol in port_vals:
        ports.append({'containerPort': port})
    return ports


# env addition
def env_gen(env_vals):
    envs = []
    for name, value in env_vals:
        envs.append({'name': name, 'value': value})
    return envs


# volumeMounts
def volume_mounts_gen(volume_mounts_vals):
    volume_mounts = []
    for name, mount_path in volume_mounts_vals:
        volume_mounts.append({'name': name, 'mountPath': mount_path})
    return volume_mounts


# volume
def volumes_gen(volume_vals):
    volumes = []
    for name, path, t in volume_vals:
        volumes.append({'name': name, 'hostPath': {'path': path, 'type': t}})
    return volumes


def deployment(basePath: str, name: str, image: list, port_vals: list, 
               env_vals: list, volume_mount_vals: list, 
               volume_vals: list) -> bool:
    
    iname = image.split('/')[1].split(':')[0]

    nname = name + "-" + iname + "-deployment"
    label = iname + "-app"

    cname = iname + "-container"


    basePath = os.path.dirname(os.path.abspath(__file__))
    with open(f'{basePath}/base_templates/deployment.yaml') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)


    metadata = data['metadata']
    metadata['name'] = nname

    d_spec = data['spec']
    d_spec['selector']['matchLabels']['app'] = label
    
    template = d_spec['template']
    template['metadata']['labels']['app'] = label
    
    t_spec = template['spec']

    # if(env_vals == None):
    #     env_vals = [[] for _ in range(len(images))]
    # if(volume_mount_vals == None):
    #     volume_mount_vals = [[] for _ in range(len(images))]

    c = {}
    c['name'] = cname
    c['image'] = image
    c['imagePullPolicy'] = "Always"

    c['ports'] = port_gen(port_vals)
    if(len(env_vals) != 0):
        c['env'] = env_gen(env_vals)
    if(len(volume_mount_vals) != 0):
        c['volumeMounts'] = volume_mounts_gen(volume_mount_vals)

    t_spec['containers'] = [c]


    if(len(volume_vals) != 0):
        t_spec['volumes'] = volumes_gen(volume_vals)


    return data

