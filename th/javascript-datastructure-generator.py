import openpyxl as xl

n = 30
print("input lang : ",end="")
lang = input()
file = lang + '/contestants/contestants_sheet.xlsx'
wb = xl.load_workbook(file)
sh = wb.get_sheet_by_name(wb.get_sheet_names()[0])
code1 = "contestant_id = ["
code2 = "contestant_name = ["
for i in range(1,n+1):
    s = sh.cell(row=i+1,column=1).value
    code1 += "'{}'{}".format(s.split()[0],"," if i!=n else "]")
    code2 += "'{}'{}".format(s.split()[1],"," if i!=n else "]")
f = open(lang + "/javascript-data.txt","w")
f.write(code1 + "\n" + code2)