//
//  MICO_MQTT API.h
//  MICO_MQTT_demo
//
//  Created by MICO-fengyutian on 15/8/16.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MQTTKit.h"


typedef void(^MQTTMessageCB)(NSString *str_message);

@interface MICO_MQTT_API : NSObject

@property (nonatomic, strong) MQTTClient *_mqttClient;


#pragma mark - 开启mqtt服务
- (void) startMqttService:(NSString *)host username:(NSString *)username password:(NSString *)password clientId:(NSString *)clientId topic:(NSString*)topic;

#pragma mark - 发送指令
- (void) pushMsg:(NSString *)message
           topic:(NSString *)topic;

#pragma mark - 接收数据
- (void) recvMsg:(NSString *)topic andCB:(MQTTMessageCB)cb;

#pragma mark - 停止接收
- (void) stopRecMsg:(NSString *)topic;

#pragma mark - 关闭mqtt服务
- (void) stopMqttService;


@end
