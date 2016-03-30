//
//  DeviceViewController.h
//  TestBonjour
//
//  Created by zfw on 15/6/3.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import <UIKit/UIKit.h>
#import  "MyMsgBox.h"
#import  "BrowserBonjour.h"

#define kWebServiceType @"_easylink._tcp"
#define kInitialDomain  @"local"
#define kwebDomain @"_easylink._tcp.local"

@interface DeviceViewController : UIViewController<UITableViewDataSource,UITableViewDelegate,NSNetServiceBrowserDelegate,NSNetServiceDelegate,BrowserBonjourDelegate>



@property(strong,nonatomic)UITableView             *m_tableView;
@property(strong,nonatomic)NSNetServiceBrowser     *m_netServiceBrowser;
@property(strong,nonatomic)UIActivityIndicatorView *m_indicatorView;
@property(strong,nonatomic)NSMutableArray          *m_services;
@property(strong,nonatomic)NSTimer                 *m_timer;
@property(strong,nonatomic)BrowserBonjour          *m_mdns;

@end
