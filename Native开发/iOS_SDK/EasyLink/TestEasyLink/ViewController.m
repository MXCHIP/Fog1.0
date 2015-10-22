//
//  ViewController.m
//  TestEasyLink
//
//  Created by zfw on 15/7/22.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController
@synthesize m_start_btn,m_stop_btn;//start and stop button

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.

    CGFloat H=[UIScreen mainScreen].bounds.size.height;
    CGFloat W=[UIScreen mainScreen].bounds.size.width;
    
    m_start_btn=[[UIButton alloc]initWithFrame:CGRectMake(0.4*W, 0.4*H, 60, 50)];
    [m_start_btn setTitle:@"start" forState:UIControlStateNormal];
    m_start_btn.backgroundColor=[UIColor grayColor];
    [m_start_btn addTarget:self action:@selector(easyLinkButtonPressedStart:) forControlEvents:UIControlEventTouchUpInside];
    
    
    m_stop_btn=[[UIButton alloc]initWithFrame:CGRectMake(0.4*W, 0.6*H, 60, 50)];
    [m_stop_btn setTitle:@"stop" forState:UIControlStateNormal];
    m_stop_btn.backgroundColor=[UIColor grayColor];
    [m_stop_btn addTarget:self action:@selector(easyLinkButtonPressedStop:) forControlEvents:UIControlEventTouchUpInside];
    
    [self.view addSubview:m_start_btn];
    [self.view addSubview:m_stop_btn];
    
}
-(void)easyLinkButtonPressedStart: (UIButton *) button
{
    NSMutableDictionary *wlanConfig = [NSMutableDictionary dictionaryWithCapacity:20];
    if( easylink_config == nil){
        easylink_config = [[EASYLINK alloc]initWithDelegate:self];
    }
    NSData *ssidData = [EASYLINK ssidDataForConnectedNetwork];
    NSString *ssidString = [EASYLINK ssidForConnectedNetwork];
    NSString *passwordString = @"1234567890";/*Your router's psw*/
    
    [wlanConfig setObject:ssidData forKey:KEY_SSID];
    [wlanConfig setObject:passwordString forKey:KEY_PASSWORD];
    [wlanConfig setObject:[NSNumber numberWithBool:YES] forKey:KEY_DHCP];
    
    [easylink_config prepareEasyLink_withFTC:wlanConfig info:nil mode:EASYLINK_V2_PLUS];
    
    [easylink_config transmitSettings];
    
    NSString *message = [NSString stringWithFormat:@"Sending ssid: %@, password: %@", ssidString, passwordString];
    
    alert = [[UIAlertView alloc] initWithTitle:@"EasyLink"
                                       message:message
                                      delegate:(id)self
                             cancelButtonTitle:@"stop"
                             otherButtonTitles:nil];
    [alert show];
}

-(void)easyLinkButtonPressedStop: (UIButton *) button
{
    if(easylink_config)
    {
        [easylink_config stopTransmitting];
        [easylink_config unInit];
        easylink_config=nil;
        NSLog(@"stop easyLink mode");
    }
    
}

#pragma mark - EasyLink delegate -

- (void)onFoundByFTC:(NSNumber *)ftcClientTag withConfiguration: (NSDictionary *)configDict
{
    NSLog(@"New device found!");
    [easylink_config configFTCClient:ftcClientTag
                   withConfiguration: [NSDictionary dictionary] ];
    [alert dismissWithClickedButtonIndex:0 animated:YES];
    
}

- (void)onDisconnectFromFTC:(NSNumber *)ftcClientTag
{
    NSLog(@"Device disconnected!");
}
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    NSLog(@"stopTransmitting");
    [easylink_config stopTransmitting];
    [easylink_config unInit];
    easylink_config=nil;
    //[easylink_config stopTransmitting];
    //[easylink_config stopTransmitting];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
