/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"yGfa7w2davIFOwnDZLXhfX4D3Wwbr3ka"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"h4FQlUEYnpwDyzCI7nprKAzavTqDAK3I"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"kgbJXLz8Gqkwj0JPRhT7BzEleeITFsTb"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"3ljSZLY7rPlnfjFIrBZaO24DkZdycp2J"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"EzvKjRSn6MgBpImly1RZg2vkPNjucp69"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"iN5LQtrQ0bzpkWY8FA1LFKAAGK1xj0MG"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
