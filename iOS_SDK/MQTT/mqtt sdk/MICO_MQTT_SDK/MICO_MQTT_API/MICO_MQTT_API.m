//
//  MICO_MQTT API.m
//  MICO_MQTT_demo
//
//  Created by MICO-fengyutian on 15/8/16.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import "MICO_MQTT_API.h"

@implementation MICO_MQTT_API


#pragma mark - 开启mqtt服务
- (void) startMqttService:(NSString *)host username:(NSString *)username password:(NSString *)password clientId:(NSString *)clientId topic:(NSString*)topic
{
    self._mqttClient = [[MQTTClient alloc] initWithClientId:[NSString stringWithFormat:@"MQTTKitTests-%@", [[NSUUID UUID] UUIDString]]];
    self._mqttClient.username = username;
    self._mqttClient.password = password;
    self._mqttClient.host = host;
    [self._mqttClient connectToHost:host
                  completionHandler:^(NSUInteger code) {
                      if (code == ConnectionAccepted)
                      {
                          NSLog(@"connect mqtt server success");
                          [self._mqttClient subscribe:topic
                                withCompletionHandler:nil];
                      }
                  }];
    
    
    __weak __typeof(&*self)weakSelf = self;
    [self._mqttClient setDisconnectionHandler:^(NSUInteger code)
     {
         NSLog(@"disconnect now,code=%ld",(unsigned long)code);
         [weakSelf._mqttClient disconnectWithCompletionHandler:^(NSUInteger code) {
             // The client is disconnected when this completion handler is called
             NSLog(@"MQTT client is disconnected");
         }];
     }];
}

#pragma mark - 发送指令
- (void) pushMsg:(NSString *)message
           topic:(NSString *)topic
{
    [self._mqttClient publishString:message toTopic:topic
                            withQos:AtMostOnce
                             retain:YES
                  completionHandler:^(int mid) {
                      NSLog(@"message has been delivered");
                  }];
    
}

#pragma mark - 接收数据
- (void) recvMsg:(NSString *)topic andCB:(MQTTMessageCB)cb
{
    [self._mqttClient subscribe:topic
          withCompletionHandler:nil];
    [self._mqttClient setMessageHandler:^(MQTTMessage *message) {
        cb(message.payloadString);
    }];
}

#pragma mark - 停止接收
- (void) stopRecMsg:(NSString *)topic
{
    
}

#pragma mark - 关闭mqtt服务
- (void) stopMqttService
{
    [self._mqttClient disconnectWithCompletionHandler:^(NSUInteger code) {
        NSLog(@"MQTT client is disconnected");
    }];
}


@end
