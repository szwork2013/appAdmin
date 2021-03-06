(function() {
    'use strict';


angular.module('app')
    .controller('adminCtrl', adminCtrl);
  	
  	function adminCtrl($state, httpService) {
  		var vm = this;

        var adminUrl = '/backend/admin';

        var flagId = 11;            // 左侧二级菜单默认的active的id为11
        vm.flag = {};               // 标志左侧二级菜单的对象

        vm.isOpen = false;          // 顶部导航右侧账号下拉菜单状态
        vm.signout = signout;       // 退出账号
        vm.menu = menu;             // 左侧一级菜单点击
        vm.childMenu = childMenu;   // 左侧二级菜单点击

        // 当前用户名称
        vm.userName = window.localStorage.getItem('userName');

        load();

        function load() {
            httpService.getDatas('GET', adminUrl + '/getMenuList/' + vm.userName)
            .then(function(data) {
                vm.menuList = menuList(data.data);
            });
                
        }

        // 菜单列表按权限显示
        function menuList(idArray) {
            var menu = [];
            var vipMenu = {'title': '会员管理', 'isOpen': true, 'childMenu': []},
                orderMenu = {'title': '订单管理', 'isOpen': true, 'childMenu': []},
                authMenu = {'title': '权限管理', 'isOpen': true, 'childMenu': []},
                helpMenu = {'title': '帮助', 'isOpen': true, 'childMenu': []};

            for(var i=0; i< idArray.length; i++) {
                switch(idArray[i]) {
                    case '11' : vipMenu.childMenu.push({'title':'采购商列表','state':'admin.vip-purchaser','id': 11}); break;
                    case '12' : vipMenu.childMenu.push({'title':'供应商列表','state':'admin.vip-supplier','id': 12}); break;
                    case '21' : orderMenu.childMenu.push({'title':'报价列表','state':'admin.order-offer','id': 21}); break;
                    case '22' : orderMenu.childMenu.push({'title':'待支付列表','state':'admin.order-paying','id': 22}); break;
                    case '23' : orderMenu.childMenu.push({'title':'已支付列表','state':'admin.order-payed','id': 23}); break;
                    case '24' : orderMenu.childMenu.push({'title':'已发货列表','state':'admin.order-shipped','id': 24}); break;
                    case '25' : orderMenu.childMenu.push({'title':'已完成列表','state':'admin.order-finished','id': 25}); break;
                    case '26' : orderMenu.childMenu.push({'title':'已关闭列表','state':'admin.order-closed','id': 26}); break;
                    case '31' : authMenu.childMenu.push({'title': '管理员列表', 'state': 'admin.auth-list','id': 31}); break;
                    case '32' : authMenu.childMenu.push({'title': '角色列表', 'state': 'admin.auth-role','id': 32}); break;
                    case '41' : helpMenu.childMenu.push({'title': '关于', 'state': 'admin.help-about','id': 41}); break;
                    case '42' : helpMenu.childMenu.push({'title': '手册', 'state': 'admin.help-manual','id': 42}); break;
                }

                // if(idArray[i] === '11') {
                //     vipMenu.childMenu.push({'title':'会员列表','state':'admin.vip-list','id': 11});
                // } else if(idArray[i] === '21') {
                //     orderMenu.childMenu.push({'title':'订单列表','state':'admin.order-list','id': 21});
                // } else if(idArray[i] === '31') {
                //     authMenu.childMenu.push({'title': '管理员列表', 'state': 'admin.auth-list','id': 31});
                // } else if(idArray[i] === '32') {
                //     authMenu.childMenu.push({'title': '角色列表', 'state': 'admin.auth-role','id': 32});
                // } else if(idArray[i] === '41') {
                //     helpMenu.childMenu.push({'title': '关于', 'state': 'admin.help-about','id': 41});
                // } else if(idArray[i] === '42') {
                //     helpMenu.childMenu.push({'title': '手册', 'state': 'admin.help-manual','id': 42});
                // }
            }

            var obj = {'vip':vipMenu, 'order':orderMenu, 'auth':authMenu, 'help': helpMenu};
            for(i in obj) {
                if(obj[i].childMenu.length > 0) {
                    menu.push(obj[i]);
                }
            }
            return menu;
        }

        // 一级菜单
        function menu(index) {
            var menuLength = vm.menuList.length;
            vm.menuList[index].isOpen = !vm.menuList[index].isOpen;
            // for(var i=0; i<menuLength; i++) {
            //     if(i === index) {
            //         vm.menuList[i].isOpen = !vm.menuList[i].isOpen;
            //     } else {
            //         vm.menuList[i].isOpen = false;
            //     }
            // }
        }
   
        // 二级菜单
        function childMenu(id) {
            if(Number(id) != flagId) {
                vm.flag[id] = true;
                vm.flag[flagId] = false;
                flagId = Number(id);
            } else {
                vm.flag[flagId] = true;
            }
        }
        // 退出账号
        function signout() {
            window.localStorage.clear();
            $state.go('signin');
        }
  	}

})();
