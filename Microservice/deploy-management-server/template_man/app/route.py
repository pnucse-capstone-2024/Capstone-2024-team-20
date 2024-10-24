import yaml
import os


def get_filter():
    return [{'type': 'URLRewrite', 'urlRewrite': {'path': {'type': 'ReplacePrefixMatch', 'replacePrefixMatch': '/'}}}]

def rule_gen(name, iname, port_vals, path_prefix):

    rules = []
    

    for port_val in port_vals:
        rule = {}
        rule['matches'] = [{'path': {'type': 'PathPrefix', 'value': path_prefix}}]
        rule['backendRefs'] = [{'name': f"{name}-{iname}-service", 'port': port_val[0]}]
        rule['filters'] = get_filter()
        rules.append(rule)

    return rules

def httproute(basePath: str, name: str, image: str, port_vals: list, path_prefix: str):
    iname = image.split('/')[1].split(':')[0]

    nname = name + "-" + iname + "-route"

    with open(f'{basePath}/base_templates/httproute.yaml') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)

    metadata = data['metadata']
    metadata['name'] = nname

    data['spec']['rules'] = rule_gen(name, iname, port_vals, path_prefix)


    return data


