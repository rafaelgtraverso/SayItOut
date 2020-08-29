from collections import defaultdict
# from os import path
import os
import glob
import json

base_path = "./cardsPng/"
d = []

for file in glob.iglob(os.path.join(base_path, '*.png'), recursive=True):
    dict = ''
    source='../assets'+file[1:]
    fileName=os.path.basename(file).split('.')[0]
    dict="{ name: '"+fileName+"', url: require('"+source+"') },"
    # print(dict)
    d.append(dict)


os.remove("./cardsPng/index.js")
f = open("./cardsPng/index.js", "a")
f.write("import React from 'react';\n")
f.write('\n')
f.write('export const Data = [\n')
for item in d:
    f.write('\t%s\n' % item)
f.write('];')
f.close()
