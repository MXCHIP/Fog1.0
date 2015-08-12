#**micomdns_out**
##包含两部分内容
	1、三个文件对应不同的场景
	1）根目录下的micomdns_out.jar，最普通的版本，适用于大部分情况
	2）4microsoft，专门用于微软云，会返回Hardware ID
	3）AllInfo，服务于特殊场景，会返回HardwareID和mdns的txtRecord的其他所有信息，此信息是一条字符串，需要自己解析
