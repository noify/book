# github 使用指南

```
$ ssh-keygen -t rsa -C "your_email@youremail.com"
```
之后会生成.ssh文件夹，复制id_rsa.pub里面的文本。
打开github -> Setting -> SHH and GPG keys -> New SHH key -> 粘贴到key，标题随便写 -> Add SHH key。

设置姓名和邮箱
```
$ git config --global user.name "your name"
$ git config --global user.email "your_email@youremail.com"
```

克隆远程仓库
```
$ git remote add yourRepo git@github.com:yourName/yourRepo.git
$ git clone git@github.com:yourName/yourRepo.git
```

添加文件/提交修改/上传/下载
```
$ git add -A
$ git commit -m "提交修改"
$ git push yourRepo master
$ git pull yourRepo master
```

.gitignore 配置不需要上传的文件夹和文件

使用vs code图形界面操作git
