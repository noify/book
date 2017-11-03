# github 使用指南

---

```bash
$ ssh-keygen -t rsa -C "your_email@youremail.com"
```
之后会生成.ssh文件夹，复制id_rsa.pub里面的文本。
打开github -> Setting -> SHH and GPG keys -> New SHH key -> 粘贴到key，标题随便写 -> Add SHH key。

设置姓名和邮箱

```bash
$ git config --global user.name "your name"
$ git config --global user.email "your_email@youremail.com"
```

克隆远程仓库并设置主机名

```bash
$ git clone -o yourRepo git@github.com:yourName/yourRepo.git
```

添加远程主机

```bash
$ git remote add yourRepo git@github.com:yourName/yourRepo.git
```

删除远程主机

```bash
$ git remote rm yourRepo
```

改名远程主机

```bash
$ git remote rename oldYourRepo newYourRepo
```

获取更新

```bash
$ git fetch yourRepo master
```

添加文件/提交修改/上传/下载
```bash
$ git add -A
$ git commit -m "提交修改"
$ git push yourRepo master
$ git pull yourRepo master
```

.gitignore 配置不需要上传的文件夹和文件
```
文件夹
*.后缀名的文件
```

使用vs code图形界面操作git
