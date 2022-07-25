# git 使用指南

---

## 安装 git

## 关联 github

```bash
# 生成ssh key
$ ssh-keygen -t rsa -C "your_email@youremail.com"
# 查看ssh key
$ cat ~/.ssh/id_rsa.pub
```
打开github -> Setting -> SHH and GPG keys -> New SHH key -> 粘贴ssh key(标题随便写) -> Add SHH key

设置姓名和邮箱

```bash
$ git config --global user.name "your name"
$ git config --global user.email "your_email@youremail.com"
```

测试是否连接
```bash
$ ssh -T git@github.com
```

## 远程主机

远程主机是一个网址，支持http[s]、SSH、Git、本地文件协议等多种协议。

## 分支

远程主机可创建多个分支，分为本地分支和远程分支，可任意合并。

## git clone

从远程主机克隆一个版本库到本地

本地分支与远程分支自动建立”追踪关系“

```bash
# -b master 可选 克隆特定分支 默认master
# -o origin 可选 设置主机名 默认origin
# directory 可选 设置本地目录名 默认版本库名
$ git clone -b master -o origin git@github.com:yourName/yourRepo.git directory
```

## git remote

每个远程主机都必须要有一个主机名

```bash
# 列出所有远程主机
# -v 可选 查看远程主机的网址
$ git remote -v

# 查看该主机的详细信息
$ git remote show origin

# 添加远程主机
$ git remote add origin git@github.com:yourName/yourRepo.git

# 删除远程主机
$ git remote rm origin

# 重命名远程主机
$ git remote rename originOld originNew
```

## git add

```bash
# 全部添加
$ git add -A
```

## git commit

```bash
# 提交
$ git commit -m "any"
```

## git branch && git checkout

创建/切换分支

远程分支的命名方式为”远程主机名/分支名“（例 `origin/master`）

```bash
# 查看远程分支
$ git branch -r

# 查看所有分支
# 远程分支会有`remotes/`的前缀
$ git branch -a

# 创建分支
# origin/master 可选 以远程分支 origin/master 为基础创建新分支 默认以当前分支为基础
$ git branch newBranch origin/master

# 手动建立追踪关系 本地分支master 追踪 远程分支origin/next
git branch --set-upstream master origin/next

# 切换分支
$ git checkout newBranch

# 创建并切换分支
# origin/master 可选 以远程分支 origin/master 为基础创建新分支 默认以当前分支为基础
$ git checkout -b newBrach origin/master
```

## git fetch

将远程主机的更新取回到本地，为远程分支

可使用`git merge`或者`git rebase` 在本地分支上合并远程分支

```bash
# -p 可选 在本地删除远程已经删除的分支 默认不删除
# master 可选 取回特定分支 默认取回所有分支
$ git fetch -p origin master
```

## git merge && git rebase

合并分支

`git merge` 从共同的祖先分支开始，当前分支和目标分支合并，产生一个新的commit

`git rebase` 从共同的祖先分支开始，取消掉当前分支的所有commit，并提取修改部分依次重新提交到目标分支最近的commit，然后将最新的目标分支更新到当前分支。

```bash
# 在当前分支上合并远程分支 origin/master
$ git merge origin/master

# 在当前分支上合并远程分支 origin/master
# -i 可选 更直观的看到哪些修改被提取
$ git rebase origin/master -i
```

## git pull

取回远程主机指定分支的更新，并与本地指定分支合并

```bash
# -p 可选 在本地删除远程已经删除的分支 默认不删除
# --rebase 可选 使用rebase合并 默认使用merge
# remotesMaster远程分支 master本地分支
# 与当前分支合并 可省略:master
# 当前分支有追踪分支时 remotesMaster:master
# 当前分支只有一个追踪分支时 可省略origin remotesMaster:master
$ git push -p --rebase origin remotesMaster:master
```

## git push

将本地分支的更新推送到远程分支

```bash
# --all 可选 将本地的所有分支都推送到远程主机
# --rebase 可选 使用rebase合并 默认使用merge
# --tags 可选 推送tag 默认不推送
# master本地分支 remotesMaster远程分支
# 可省略:remotesMaster推送本地分支master 远程分支不存在则新建
# 当前分支有追踪分支时 可省略master:remotesMaster
# 当前分支只有一个追踪分支时 可省略origin master:remotesMaster
$ git push --all --rebase origin master:remotesMaster --tags

# 推送本地分支master到远程主机origin，并将远程主机origin指定为默认主机，之后可不加任何参数使用`git push`
$ git push -u origin master

# 不带任何参数的git push
# 默认simple模式 只推送当前分支
# 可设置matching模式 推送所有有对应的远程分支的本地分支
$ git push

# 设置模式 默认simple 可设置matching
$ git config --global push.default matching
$ git config --global push.default simple

# 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支
$ git push origin :master
# 等同于
$ git push origin --delete master
```


## git init

创建一个本地库

## .gitignore 配置不需要上传的文件夹和文件

```
文件夹
*.后缀名的文件
```

## 使用vs code图形界面操作git
