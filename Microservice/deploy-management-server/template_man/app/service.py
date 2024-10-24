import yaml
import os

def port_gen(port_vals):
    ports = []
    for port, protocol in port_vals:
        ports.append({'protocol': protocol, 'port': port, 'targetPort': port})
    return ports

def service(basePath: str, name: str, image:list, port_vals:list):
    iname = image.split('/')[1].split(':')[0]

    nname = name + "-" + iname + "-service"
    selector = iname + "-app"

    with open(f'{basePath}/base_templates/service.yaml') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)

    metadata = data['metadata']
    metadata['name'] = nname

    spec = data['spec']
    spec['selector']['app'] = selector
    
    spec['ports'] = port_gen(port_vals)

    # print(yaml.dump(data, default_flow_style=False))
    # print(data)
    
    return data
