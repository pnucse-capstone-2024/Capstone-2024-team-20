import os
import docker


class Docker:
    client = docker.DockerClient(base_url='unix://var/run/docker.sock')
    building = []
    failed = []

    def __init__(self, save_dir, repo, username, password) -> None:    
        self.save_dir = save_dir
        self.repo = repo

        self.client.login(username, password)
        self.username = username
        self.password = password
        self.building = []
        self.failed = []
        

    def build(self, git_repo, image_name, image_tag, labels):
        try:
            path = os.path.join(self.save_dir, git_repo)
            tag = f"{self.repo}/{image_name}:{image_tag}"

            print("build start..")
            self.building.append(tag)
            ret = self.client.images.build(path=path, nocache=True, rm=True, tag=tag, labels=labels)
            print("build finished.")
            self.building.remove(tag)
        except:
            print("build failed.")
            self.failed.append(tag)

        return tag

    def push(self, image_name, image_tag):
        resp = self.client.api.push(
            f"{self.repo}/{image_name}:{image_tag}",
            stream=True,
            decode=True,
            auth_config={
                'username': self.username,
                'password': self.password
            }
        )
        for line in resp:
            print(line)
            
        return True
    
    def get_list(self):
        images = self.client.images.list(filters={"dangling": False})
        images = [image.tags for image in images]
        building_images = [f"[building]{build_image}" for build_image in self.building if build_image not in images]
        failed_images = [f"[failed]{fail_image}" for fail_image in self.failed if fail_image not in images]
        
        return images + building_images + failed_images


    def inspect(self, image):
        try:
            spec = self.client.images.get(image).attrs["Config"]["Labels"]
            return spec
        except:
            return None