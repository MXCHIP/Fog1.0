//
//  DeviceViewController.m
//  TestBonjour
//
//  Created by zfw on 15/6/3.
//  Copyright (c) 2015年 mxchip. All rights reserved.
//

#import "DeviceViewController.h"



@interface DeviceViewController ()

@end



@implementation DeviceViewController

-(void)startTimer
{
    if(self.m_timer)
    {
        [self.m_timer invalidate];
        self.m_timer=nil;
    }
    self.m_timer=[NSTimer scheduledTimerWithTimeInterval:15 target:self selector:@selector(killTimer) userInfo:nil repeats:NO];
}

-(void)killTimer
{
    if(self.m_timer)
    {
        [self.m_timer invalidate];
        [self.m_indicatorView stopAnimating];
        [self.m_netServiceBrowser stop];
        self.m_netServiceBrowser=nil;
        if(self.m_services.count==0)
            [MyMsgBox showMessage:@"没有发现任何设备" Lasttime:5 ];
        self.m_timer=nil;
    }
}

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    self.m_services=[[NSMutableArray alloc]init];

    [self addViews];
    
    self.m_mdns=[[BrowserBonjour alloc]init];
    self.m_mdns.delegate=self;
    [self.m_mdns getMdns:kWebServiceType andDomain:kInitialDomain];
//    [self.m_mdns getMdns:kwebDomain];
}

// 添加视图
- (void)addViews
{
    self.title=@"MicoKit";
    
    CGRect appFrame = [ UIScreen mainScreen ].bounds;
    self.m_tableView=[[UITableView alloc]initWithFrame:appFrame];
    self.m_tableView.delegate=self;
    self.m_tableView.dataSource=self;
    [self.view addSubview:self.m_tableView];
    
    self.m_indicatorView=[[UIActivityIndicatorView alloc]initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    self.m_indicatorView.center=self.view.center;
    [self.view addSubview:self.m_indicatorView];
    
    UIBarButtonItem *rightBtn=[[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemRefresh target:self action:@selector(rightBtnClicked)];
    self.navigationItem.rightBarButtonItem=rightBtn;
    [self.navigationController.navigationBar setBackgroundImage:[UIImage imageNamed:@"navbar2.png"] forBarMetrics:UIBarMetricsDefault];//后面参数什么意思？？？
    [self.navigationController.navigationBar setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:[UIColor colorWithRed:0 green:0.7 blue:0.8 alpha:1], NSForegroundColorAttributeName,nil]];

}

-(void)rightBtnClicked
{
    if(self.m_mdns)
    {
        [self.m_mdns stopMdns];
        self.m_mdns=nil;
    }
    self.m_mdns=[[BrowserBonjour alloc]init];
    self.m_mdns.delegate=self;
    [self.m_mdns getMdns:kWebServiceType andDomain:kInitialDomain];
//    [self.m_mdns getMdns:kwebDomain];
    
    [self.m_services removeAllObjects];
    [self.m_tableView reloadData];
    
}

#pragma mark BrowserBonjourDelegate
-(void)returnMndsData:(NSArray *)servicesData
{
    self.m_services=(NSMutableArray*)servicesData;
    [self.m_tableView reloadData];
    [self.m_mdns stopMdns];
    self.m_mdns=nil;
    NSLog(@"data returing");
}

#pragma mark - tableViewDelegate method
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 70;
}
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.m_services.count;
}
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [MyMsgBox showMessage:@"Under Construction" Lasttime:3.0];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *cellId=@"UITableViewCellID";
    UITableViewCell *cell=nil;
    cell=[tableView dequeueReusableCellWithIdentifier:cellId];
    if(cell==nil)
    {
        cell=[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:cellId];
    }
    
    
    //每个设备的小字典dict
//    {
//        BonjourService = "<NSNetService 0x14d63c30> local. _easylink._tcp. MiCOKit 3288#91813C";
//        Name = "MiCOKit 3288#91813C"; //serviceName
//        resolving = 1;
//    }
    NSLog(@"m_services ============== %@", self.m_services);
    NSDictionary *dict=[self.m_services objectAtIndex:indexPath.row];
    NSString *serviceName = dict[@"Name"];
    NSString *displayServiceName;
    NSRange range = [serviceName rangeOfCharacterFromSet:[NSCharacterSet characterSetWithCharactersInString:@"#"] options:NSBackwardsSearch];
    
    if(range.location == NSNotFound) {
        range.length = [serviceName length];
    }
    else {
        range.length = range.location;
    }
    
    range.location = 0;
    // 设备名称
    displayServiceName = [serviceName substringWithRange:range];
    
    NSNetService *service=dict[@"BonjourService"];
    NSString *macAddress=nil;
    NSString *module=nil;
    NSString *binding=nil;//add new word section,是否绑定
    NSData *bind = [[NSNetService dictionaryFromTXTRecordData:[service TXTRecordData]] objectForKey:@"binding"];
    binding = [[NSString alloc] initWithData: bind encoding:NSASCIIStringEncoding];
    NSLog(@"%@", binding);
    
    NSData *mac = [[NSNetService dictionaryFromTXTRecordData:[service TXTRecordData]] objectForKey:@"MAC"];
    // mac 地址
    macAddress = [[NSString alloc] initWithData: mac encoding:NSASCIIStringEncoding];

    NSData *hd = [[NSNetService dictionaryFromTXTRecordData:[service TXTRecordData]] objectForKey:@"Model"];
    module = [[NSString alloc] initWithData:hd encoding:NSASCIIStringEncoding];
    
    
    NSData *ipAddress;
    
    if(service.addresses.count)
    {
        ipAddress = [service.addresses objectAtIndex:0];
    }
    NSLog(@"cellforRowAtIndex=%ld",(unsigned long)service.addresses.count);
    
    
    // IP地址
    NSString *ipAdd = [ipAddress host];
    NSLog(@"ip=%@",ipAdd);

    cell.detailTextLabel.numberOfLines=0;
    NSString *detailString = [[NSString alloc] initWithFormat:
                              @"MAC:%@ \nIP :%@",
                              macAddress,
                              (ipAddress!=nil)? ipAdd:@"Unknow"];
    
    cell.textLabel.text = displayServiceName;
    cell.textLabel.textColor = [UIColor redColor];
    cell.detailTextLabel.text = detailString;

    cell.imageView.image = [UIImage imageNamed:[NSString stringWithFormat:@"%@.png", module]];
    if(cell.imageView.image==nil)
    {
            cell.imageView.image = [UIImage imageNamed:@"known_logo.png"];
    }
    cell.imageView.contentMode = UIViewContentModeScaleAspectFit;
    cell.accessoryType=UITableViewCellAccessoryDetailDisclosureButton;
    return cell;
}



@end
