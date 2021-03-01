import os


for i in os.listdir(os.getcwd()):
	print("import \"./components/css/{}\";".format(i))