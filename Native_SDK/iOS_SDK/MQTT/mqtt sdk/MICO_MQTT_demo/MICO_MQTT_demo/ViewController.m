//
//  ViewController.m
//  MICO_MQTT_demo
//
//  Created by MICO-fengyutian on 15/8/16.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import "ViewController.h"


#define MQTTHOST @"api.easylink.io"
#define Topic_out @"ebfc7110/c89346918620/out/#"
#define Topic_in @"ebfc7110/c89346918620/in"
#define Message @" "
#define ClientId @" "
#define Username @" "
#define Password @" "

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 开始按钮
    UIButton *startBtn = [UIButton buttonWithType:UIButtonTypeSystem];
    [startBtn setFrame:CGRectMake(100, 100, 200, 50)];
    startBtn.backgroundColor = [UIColor whiteColor];
    [startBtn setTitle:@"start" forState:UIControlStateNormal];
    [self.view addSubview:startBtn];
    
    // 订阅按钮
    UIButton *subscribeBtn = [UIButton buttonWithType:UIButtonTypeSystem];
    [subscribeBtn setFrame:CGRectMake(100, 200, 200, 50)];
    subscribeBtn.backgroundColor = [UIColor whiteColor];
    [subscribeBtn setTitle:@"sub" forState:UIControlStateNormal];
    [self.view addSubview:subscribeBtn];
    
    // 发布按钮
    UIButton *publishBtn = [UIButton buttonWithType:UIButtonTypeSystem];
    [publishBtn setFrame:CGRectMake(100, 300, 200, 50)];
    publishBtn.backgroundColor = [UIColor whiteColor];
    [publishBtn setTitle:@"publish" forState:UIControlStateNormal];
    [self.view addSubview:publishBtn];
    
    // 停止按钮
    UIButton *stopBtn = [UIButton buttonWithType:UIButtonTypeSystem];
    [stopBtn setFrame:CGRectMake(100, 400, 200, 50)];
    stopBtn.backgroundColor = [UIColor whiteColor];
    [stopBtn setTitle:@"stop" forState:UIControlStateNormal];
    [self.view addSubview:stopBtn];
    
    // 给每个按钮绑定方法
    [startBtn addTarget:self action:@selector(startBtnAction) forControlEvents:UIControlEventTouchUpInside];
    [subscribeBtn addTarget:self action:@selector(subscribeBtnAction) forControlEvents:UIControlEventTouchUpInside];
    [publishBtn addTarget:self action:@selector(publishBtnAction) forControlEvents:UIControlEventTouchUpInside];
    [stopBtn addTarget:self action:@selector(stopbtnAction) forControlEvents:UIControlEventTouchUpInside];
    
    // 初始化对象
    self._client = [MICO_MQTT_API new];
    
}


// 开始按钮
- (void)startBtnAction
{
    //调用“开启服务”接口 参数分别为：服务器名(MQTTHOST) 用户名(Username) 密码(Password) 用户手机Mac地址(ClientId) 订阅的频道(Topic_out)
    //用户名 密码 目前置空即可，待新版本服务器推出后方生效
    [self._client startMqttService:MQTTHOST username:Username password:Password clientId:ClientId topic:Topic_out];
}

- (void)subscribeBtnAction
{
    // 参数为：订阅的频道(Topic_out)
    // 订阅频道所收到的消息通过"str_message"属性回调，用户可自定义属性接收
    [self._client recvMsg:Topic_out andCB:^(NSString *str_message) {
        NSLog(@"%@",str_message);
    }];
    
}

- (void)publishBtnAction
{
    //调用“发布消息”接口
    // 参数分别为：需要发布的消息(Message) 发布频道(Topic_in)
    [self._client pushMsg:Message topic:Topic_in];
}

- (void)stopbtnAction
{
    //调用“停止”接口
    [self._client stopMqttService];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
