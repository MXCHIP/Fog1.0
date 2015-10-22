//
//  MyMsgBox.m
//  SinaWeiBo
//
//  Created by zfw on 15/5/8.
//  Copyright (c) 2015年 mac. All rights reserved.
//

#import "MyMsgBox.h"

@implementation MyMsgBox


+(void)showMessage:(NSString *)msg Lasttime:(CGFloat)seconds
{
    CGFloat W=[UIScreen mainScreen].bounds.size.width;//屏幕宽
    CGFloat H=[UIScreen mainScreen].bounds.size.height;//屏幕高
    CGFloat L=150;//label定宽
    UIWindow * window = [UIApplication sharedApplication].keyWindow;
    //未知，后面调整
    UIView *showview =  [[UIView alloc]initWithFrame:CGRectZero];
    showview.backgroundColor = [UIColor blackColor];
    showview.alpha = 1.0f;
    showview.layer.cornerRadius = 5.0f;//画出圆角带弧度的矩形
    //showview.layer.masksToBounds = YES;
    [window addSubview:showview];//加到window上面
    
    UILabel *label = [[UILabel alloc]initWithFrame:CGRectZero];
    //label.numberOfLines=0;//一般不需要支持多行，单行即可
    //尺寸未知
    CGSize textSize=CGSizeMake(L, 0);//定死label的宽度
    NSDictionary *dict=@{NSFontAttributeName:[UIFont systemFontOfSize:15] };
    //在显示宽度和文字数量，大小已知的情况下得出label的高度
    CGRect LabelSize=[msg boundingRectWithSize:textSize options:NSStringDrawingUsesLineFragmentOrigin|NSStringDrawingUsesFontLeading attributes:dict context:nil];
    
    label.frame = CGRectMake(0, 10, L, LabelSize.size.height);
    label.text  = msg;
    label.textColor = [UIColor whiteColor];
    label.textAlignment = NSTextAlignmentCenter;//居中显示
    label.backgroundColor = [UIColor clearColor];//clearcolor是背景色透明,alpha=0是整个控件透明
    label.font=[UIFont systemFontOfSize:15];
    [showview addSubview:label];
    //重新计算showview的尺寸
    showview.frame = CGRectMake( (W - L)/2, H - 100, L, LabelSize.size.height+20);
    
    //动画＋隐藏
    [UIView animateWithDuration:seconds animations:^{
        showview.alpha = 0;//允许动画,只要不设置成1就行
    } completion:^(BOOL finished) {
        [showview removeFromSuperview];//时间到，慢慢消失移除出window
    }];
    
}
@end
