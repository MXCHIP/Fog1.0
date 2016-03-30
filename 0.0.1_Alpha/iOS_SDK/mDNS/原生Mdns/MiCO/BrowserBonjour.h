//
//  BrowserBonjour.h
//  MiCO
//
//  Created by zfw on 15/6/5.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <sys/socket.h>
#import <netinet/in.h>
#import <arpa/inet.h>

#define kWebServiceType @"_easylink._tcp"
#define kInitialDomain  @"local"


@interface NSData (Additions)
- (NSString *)host;
@end

@protocol BrowserBonjourDelegate <NSObject>

-(void)returnMndsData:(NSArray *)servicesData;

@end


@interface BrowserBonjour : NSObject<NSNetServiceBrowserDelegate,NSNetServiceDelegate>

@property(strong,nonatomic)id<BrowserBonjourDelegate>delegate;
@property(strong,nonatomic)NSNetServiceBrowser     *m_netServiceBrowser;
@property(strong,nonatomic)NSMutableArray          *m_services;

//-(void)getMdns:(NSString*)serviceType;
-(void)getMdns:(NSString*)serviceType  andDomain:(NSString*)domain ;
-(void)stopMdns;

@end







