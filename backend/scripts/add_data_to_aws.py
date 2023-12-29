import os
import codecs
import requests

API_ENDPOINT = 'https://n4ae4vqh0g.execute-api.us-west-2.amazonaws.com/v0'

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../')

def read_ignore_file(gitIgnorePath):
    files = []
    f = open(gitIgnorePath, 'r')
    for line in f:
        l = line.rstrip()

        if l and not l.startswith('#'):
            if l.startswith('/'):
                l = l[1:]
            files.append(l)
    f.close()
    return set(files)

ignore_files = set(['.git'])

allowed_extensions = ['py', 'tsx', 'css', 'scss', 'js', 'txt', 'md', 'yaml', 'toml', 'ts', 'yml']

if __name__ == '__main__':
    file_system_list = []
    for root, subdirs, files in os.walk(ROOT):
        GIT_IGNORE_PATH = os.path.join(root, '.gitignore')
        if os.path.exists(GIT_IGNORE_PATH):
            ignore_files = ignore_files.union(read_ignore_file(GIT_IGNORE_PATH))
        [subdirs.remove(d) for d in list(subdirs) if d in ignore_files]
        rootReplace = root.replace(ROOT, '')
        if root.replace(ROOT, ''):
            file_system_list.append(dict(name=root.replace(ROOT, ''), content='', isFolder=True))

        for filename in files:
            file_path = os.path.join(root, filename).replace(ROOT, '')
            if os.path.basename(file_path) not in ignore_files:
                # import pdb; pdb.set_trace()
                if file_path.split('.')[-1] in allowed_extensions:
                    with codecs.open(ROOT + file_path, 'r', 'utf-8') as fp:
                        content = fp.read()

                        file_system_list.append(dict(name=file_path, content=content, isFolder=False))
    import json
    for file in file_system_list:
        response = requests.post(url=API_ENDPOINT + '/file_system',
                      json=file)
        print(response.json())
    # print(json.dumps(file_system_list,indent=2))
