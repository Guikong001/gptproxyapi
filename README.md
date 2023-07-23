# 通过Cloudflare worker进行API转发

worker.js可以将官方key更换名称使用

如果没有设定用别名替换官方key，直接调用默认的官方key也可以正常转发调用

<br/>

- 中转调用测试地址：
- https://api.wslll.top
- https://wapi.wslll.top

<br/>

中文屏蔽词版本设置了简单的屏蔽词列表，数据相关的敏感词汇可以实现拒绝回答

<br/>

# Cloudflare部署中转的方法

1.购买一个自己的域名，并使用cloudflare解析

2.登录cf后台，打开workers and pages

3.添加新的workers，添加完成后，点击右上角快速编辑，将本项目代码复制粘贴到worker.js代码

3.回到workers界面，点击“触发器”，用自己的域名设置一个调用地址
