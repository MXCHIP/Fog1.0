//
//  BrowserBonjour.m
//  MiCO
//
//  Created by zfw on 15/6/5.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import "BrowserBonjour.h"

@implementation NSData (Additions)
- (NSString *)host
{
    struct sockaddr *addr = (struct sockaddr *)[self bytes];
    if(addr->sa_family == AF_INET) {
        char *address = inet_ntoa(((struct sockaddr_in *)addr)->sin_addr);
        if (address)
            return [NSString stringWithCString: address encoding: NSASCIIStringEncoding];
    }
    else if(addr->sa_family == AF_INET6) {
        struct sockaddr_in6 *addr6 = (struct sockaddr_in6 *)addr;
        char straddr[INET6_ADDRSTRLEN];
        inet_ntop(AF_INET6, &(addr6->sin6_addr), straddr,
                  sizeof(straddr));
        return [NSString stringWithCString: straddr encoding: NSASCIIStringEncoding];
    }
    return nil;
}

@end
/********************************************/
@interface BrowserBonjour ()
{
    int g_count;
}

@end

@implementation BrowserBonjour
@synthesize m_netServiceBrowser,m_services;

//重写init，加入一点初始化条件
- (instancetype)init;
{
    if(self=[super init])
    {
        m_services=[[NSMutableArray alloc]init];
        g_count=0;
    }
    return self;
}



////////////////2
//-(void)getMdns:(NSString*)serviceType
-(void)getMdns:(NSString*)serviceType  andDomain:(NSString*)domain
{
    if(m_netServiceBrowser)
    {
        [self.m_netServiceBrowser stop];
        self.m_netServiceBrowser=nil;
    }
    self.m_netServiceBrowser = [[NSNetServiceBrowser alloc] init];
    self.m_netServiceBrowser.delegate=self;
    
    [self.m_netServiceBrowser searchForServicesOfType:serviceType inDomain:domain];//此方法不会阻塞
//    [self.m_netServiceBrowser searchForServicesOfType:kwebDomain inDomain:nil];
}

///////////6 刷新第一步
-(void)stopMdns
{
    [self.m_netServiceBrowser stop];
    self.m_netServiceBrowser=nil;
}
- (void)netServiceBrowser:(NSNetServiceBrowser *)aNetServiceBrowser didNotSearch:(NSDictionary *)errorDict
{
    NSLog(@"error");
}
// New service was found//////////////3
- (void)netServiceBrowser:(NSNetServiceBrowser *)aNetServiceBrowser didFindService:(NSNetService *)service moreComing:(BOOL)moreComing;
{
    NSLog(@"didFindService");
    g_count++;
    NSMutableDictionary *moduleService=[[NSMutableDictionary alloc]init];
    service.delegate=self;
    NSLog(@"count=%ld", (unsigned long)service.addresses.count);
    [moduleService setObject:[service name] forKey:@"Name"];
    [moduleService setObject:service forKey:@"BonjourService"];
    [moduleService setObject:@YES forKey:@"resolving"];
    [service startMonitoring];
    
    [m_services addObject:moduleService];
    [service resolveWithTimeout:5.0];
    
    // If more entries are coming, no need to update UI just yet
    if ( !moreComing ) {
        [self.m_netServiceBrowser stop];
        self.m_netServiceBrowser=nil;
    }
}

#pragma mark - NSNetServiceDelegate

//////////////5
- (void)netService:(NSNetService *)sender didNotResolve:(NSDictionary *)errorDict
{
    NSLog(@"didNotResolve");
}

- (void)netServiceDidStop:(NSNetService *)sender
{
    NSLog(@"netServiceDidStop");
}


- (void)netServiceDidResolveAddress:(NSNetService *)service
{
    NSLog(@"netServiceDidResolveAddress");
    [service stop];//这行很重要
    g_count--;
    if(g_count==0)
    {
        //[self killTimer];
        [self.delegate returnMndsData:m_services];
    }
    /*
     {
     "Firmware Rev" = <4d4b3332 38385f31 5f305f35>;
     "Hardware Rev" = <4d4b3332 38385f31>;
     MAC = <43383a39 333a3436 3a39313a 38313a38 35>;
     "MICO OS Rev" = <31303838 30303032 2e303331>;
     Manufacturer = <4d584348 49502049 6e632e>;
     Model = <4d69434f 4b69742d 33323838>;
     Protocol = <636f6d2e 6d786368 69702e6d 69636f6b 6974>;
     Seed = <333135>;
     }
     */
     NSDictionary *containData = [NSNetService dictionaryFromTXTRecordData:[service TXTRecordData]];
    NSLog(@"containData = ========== %@", containData);
 }

///////////////////4
- (void)netService:(NSNetService *)service didUpdateTXTRecordData:(NSData *)data
{
    NSLog(@"didUpdateTXTRecordData");
}

@end






