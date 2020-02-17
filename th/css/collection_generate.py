n = 30
cid = ["F","M"]
num = [16,14]
print("input lang : ",end="")
lang = input()
# to generate css file
file = lang + "/css/collection.css"
f = open(file,"w")
code = ""
for i in range(len(cid)):
    for j in range(num[i]):
        s = str(j+1) if j+1 >= 10 else "0" + str(j+1)
        contest = cid[i] + s
        code += ("." + contest + " {") + "\n"
        code += ("   background-size: contain;") + "\n"
        code += ("   background-repeat: no-repeat;") + "\n"
        code += ("   background-position: center;") + "\n"
        code += ('   background: url("../images/contestants/' + contest + ".jpg\")" + "\n")
        code += "}" + "\n"
for i in range(len(cid)):
    for j in range(num[i]):
        s = str(j+1) if j+1 >= 10 else "0" + str(j+1)
        contest = cid[i] + s
        code += ("." + contest + "-L {") + "\n"
        code += ("   background-size: contain;") + "\n"
        code += ("   background-repeat: no-repeat;") + "\n"
        code += ("   background-position: center;") + "\n"
        code += ('   background: url("../images/contestants/' + contest + "-L.jpg\")" + "\n")
        code += "}" + "\n"
f.write(code)
print("done")