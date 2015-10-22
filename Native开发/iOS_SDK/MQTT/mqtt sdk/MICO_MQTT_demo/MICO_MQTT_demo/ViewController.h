//
//  ViewController.h
//  MICO_MQTT_demo
//
//  Created by MICO-fengyutian on 15/8/16.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MICO_MQTT_API.h"

@interface ViewController : UIViewController

@property (strong, nonatomic) MICO_MQTT_API *_client;

@end

