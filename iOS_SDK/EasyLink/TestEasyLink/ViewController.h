//
//  ViewController.h
//  TestEasyLink
//
//  Created by zfw on 15/7/22.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EASYLINK.h"

@interface ViewController : UIViewController<EasyLinkFTCDelegate>
{
    EASYLINK *easylink_config;
    UIAlertView *alert;
}
@property(strong,nonatomic)UIButton *m_start_btn;
@property(strong,nonatomic)UIButton *m_stop_btn;

-(void)easyLinkButtonPressedStart: (UIButton *) button;
-(void)easyLinkButtonPressedStop: (UIButton *) button;

@end

