from collections import defaultdict
import os
import glob
import json
from googletrans import Translator

translator = Translator()
base_path = "./pecsCards/"
d = []
count=0

for file in glob.iglob(os.path.join(base_path, '*.jpg'), recursive=True):
    dict = ''
    count+=1
    source='..'+file[1:]
    fileName=os.path.basename(file).split('.')[0].replace('_',' ')
    dict="{ card_id:"+str(count)+", name: \""+fileName+"\", url: require(\""+source+"\"), name_it: \""+translator.translate(fileName, dest='it', src='en').text+"\" },"
    d.append(dict)
    print(count)

os.remove("./pecsCards/index.js")
f = open("./pecsCards/index.js", "a")
f.write('export const Data = [\n')
for item in d:
    f.write('\t%s\n' % item)
f.write('];')
f.close()

# SCRIPT TO TRANSLATE --- THIS SCRIPT RUNS WITH googletrans which needs a vpn 
# os.remove('./translated.js')
# file = open('./translate.js')
# f = open('./translated.js','a')
# for ln in file:
#     count+=1
#     print(count)
#     if count>0:
#         if(ln.find('name')>0):
#             nameStart=ln.find("'")+1
#             nameEnd=ln.find("'",nameStart)
#             f.write(ln[0:nameStart-3]+"_it: \""+translator.translate(ln[nameStart:nameEnd], dest='it', src='en').text+"\"},\n")
#     #     else:
#     #         f.write(ln)
#     else:
#         f.write(ln)

#     #     f.write(ln[0:(ln.find(', url',11))]+"\n")
# file.close()
# f.close()