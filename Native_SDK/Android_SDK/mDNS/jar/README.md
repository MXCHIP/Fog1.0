#**micomdns_out**
##包含两部分内容
	1）根目录下的micomdns_out.jar，最普通的版本，适用于大部分情况
	2）AllInfo，服务于特殊场景，会返回HardwareID和mdns的txtRecord的其他所有信息，此信息是一条字符串，需要自己解析，其中Android版本会返回“unicode字符编码”后台将“\”转成了“x”，如“\u0012”-->"xu0012"
