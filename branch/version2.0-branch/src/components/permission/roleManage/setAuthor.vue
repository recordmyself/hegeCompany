<template>
  <div class="setAuthor" id="roleDialog">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="true" title="角色权限"
               :visible.sync="store.dialogAuth" @open='getAuth'>  
      <el-form :model="store.configForm" label-width="110px" class="demo-ruleForm">
        
        <div class="rolePower">
          <div class="rolePow" prop="store.configForm">
            <div class="el-tree" id="authTree">

            </div>
          </div>
          <div slot="footer" style="text-align:center;" class="dialog-footer">
            <el-button size="small" type="primary" @click="sureAuth">确 定</el-button>
            <el-button size="small"  @click="cancelAuth">取 消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

  // import {store} from './../../store/store';
  import { store } from './store'
  // import { doMain.base } from '../../../service/ip'
  import { doMain } from '../../../protocal/url'
  // import { role } from "../../../service/backstageService";
  import { RoleProtocal } from "../../../protocal/base/RoleProtocal"
  import { axiosHttpPost } from '../../../assets/js/axios'
  // import {url} from './../../protocal/url';
  // import {hgFuc} from './../../assets/js/fuc';
  // import {role} from './../../protocal/role';

  export default{
    data(){
      return {
        store,
        // dialog: store.basicAdmin.roleAdmin.dialog,
        authTreeMenuList: [{
          id: 0,
          name: '全部',
          subMenuList: [],
          buttonList: []
        }],
        authTreeIndent: 0,
        sendAuth: []
      }
    },
    mounted(){
      this.$nextTick(() => {
        let _this = this;
        //点击勾选事件
        $('#roleDialog').on('click', '.menuList', function (event) {
          event.preventDefault();
          if ($(this).parent().parent().hasClass('el-tree-node__content')) {
            //最左侧button  如果已选  移出
            if ($(this).hasClass('is-checked')) {
              $(this).removeClass('is-checked');
              let authSelect = $(this).parent().parent().siblings('.el-tree-node__children').find('.authSelect');
              let menuSelect = $(this).parent().parent().siblings('.el-tree-node__children').find('.menuList');
              for (let i = 0; i < menuSelect.length; i++) {
                menuSelect.eq(i).removeClass('is-checked');
              }
              for (let i = 0; i < authSelect.length; i++) {
                authSelect.eq(i).removeClass('is-checked');
              }
              _this.buttonSure($(this).parent().parent());
            } else {
              $(this).addClass('is-checked');
              let authSelect = $(this).parent().parent().siblings('.el-tree-node__children').find('.authSelect');
              let menuSelect = $(this).parent().parent().siblings('.el-tree-node__children').find('.menuList');
              for (let i = 0; i < authSelect.length; i++) {
                authSelect.eq(i).addClass('is-checked');
              }
              for (let i = 0; i < menuSelect.length; i++) {
                menuSelect.eq(i).addClass('is-checked');
              }
              _this.setButtonSelect($(this).parent().parent());
            }
          }
        });
        // 点击下拉/影藏
        $('#roleDialog').on('click', '.el-tree-node__label', function (event) {
          event.preventDefault();
          if ($(this).parent().siblings('.el-tree-node__children').css('display') == 'none') {
            $(this).parent().siblings('.el-tree-node__children').show(300);
          } else {
            $(this).parent().siblings('.el-tree-node__children').hide(300);
          }
        });
        $('#roleDialog').on('click', '.el-tree-node__expand-icon', function (event) {
          event.preventDefault();
          if ($(this).parent().siblings('.el-tree-node__children').css('display') == 'none') {
            $(this).parent().siblings('.el-tree-node__children').show(300);
          } else {
            $(this).parent().siblings('.el-tree-node__children').hide(300);
          }
        });
        //权限列表选项点击事件
        $('#roleDialog').on('click', '.authSelect', function (event) {
          event.preventDefault();
          if ($(this).hasClass('is-checked') == true) {
            $(this).removeClass('is-checked');
            let check = true;
            if ($(this).parent().siblings('.el-checkbox')) {
              let $siblings = $(this).parent().siblings('.el-checkbox');
              //点击其中所有的才取消上面全选
              for (let i = 0; i < $siblings.length; i++) {
                if ($siblings.eq(i).children('.authSelect').hasClass('is-checked')) {
                  check = false;
                }
              }
              if (check) {
                _this.buttonSure($(this).parent());
              }
              //点击其中一个即取消上面所有
              // for (let i = 0; i < $siblings.length; i++) {
              //   if (!$siblings.eq(i).children('.authSelect').hasClass('is-checked')) {
              //     check = false;
              //   }
              // }
              // if (check) {
              //   _this.buttonSure($(this).parent());
              // }
            }
            // if (check) {
            //   _this.buttonSure($(this).parent());
            // }
          } else {
            $(this).addClass('is-checked');
            let $siblings = $(this).parent().siblings('.el-checkbox');
            let check = true;
            //1.点击其中一个其中一个就勾选
            for (let i = 0; i < $siblings.length; i++) {
              console.log($siblings.eq(i).children('.authSelect').hasClass('is-checked'));
              if ($siblings.eq(i).children('.authSelect').hasClass('is-checked')) {
                console.log('进了1');
                check = false;
              }
            }
            if (check) {
              console.log('进了2');
              _this.setButtonSelect($(this).parent());
            }
            //2.点击所有的才将上面勾选
            // for (let i = 0; i < $siblings.length; i++) {
            //   if (!$siblings.eq(i).children('.authSelect').hasClass('is-checked')) {
            //     check = false;
            //   }
            // }
            // if (check) {
            //   _this.setButtonSelect($(this).parent());
            // }
          }
        });
      })
    },
    methods: {
      //取消授权
      cancelAuth(){
        this.store.dialogAuth = false;
        for (let i = 0; i < $('.menuList').length; i++) {
          $('.menuList').eq(i).removeClass('is-checked');
        }
        for (let i = 0; i < $('.buttonMenu').length; i++) {
          $('.buttonMenu').eq(i).removeClass('is-checked');
        }
      },

      //确定授权
      sureAuth(){
        //               已勾选的menu
        let menuArray = [];
        //                已勾选的 按钮
        let buttonArray = [];
        //                所有的menu
        let menuList = $('.menuList');
        //                所有的按钮
        let buttonList = $('.buttonMenu');

        for (let i = 0; i < menuList.length; i++) {
          if (menuList.eq(i).hasClass('is-checked') == true) {
            menuArray.push(menuList.eq(i).data('id'));
          }
        }
        if (menuArray.length == 0) {
          this.sendAuth = [];
        } else {
          for (let i = 0; i < buttonList.length; i++) {
            if (buttonList.eq(i).hasClass('is-checked') == true) {
              buttonArray.push(buttonList.eq(i).data('id'));
            }
          }
          $.extend(true, this.sendAuth, this.authTreeMenuList[0].subMenuList);
          this.sureMenu(menuArray, this.sendAuth, buttonArray);
        }

        this.auth();
      },

      // 确定menulist
      sureMenu(arr, obj, array){
        let _this = this;
        for (let i = 0; i < obj.length; i++) {
          let check = true;
          let id = obj[i].id;
          $(arr).each(function (Index, val) {
            if (val == id) {
              if (obj[i].subMenuList.length !== 0) {
                _this.sureMenu(arr, obj[i].subMenuList, array);
              } else {
                _this.sureButton(array, obj[i].buttonList);
              }
              check = false;
            }
          });
          if (check) {
            obj.splice(i, 1);
            i--;
          }
        }
      },
      sureButton(arr, obj){
        let _this = this;
        $(obj).each(function (index, item) {
          let check = true;
          let id = item.id;
          $(arr).each(function (Index, val) {
            if (val == id) {
              check = false;
            }
          });
          if (check) {
            obj.splice(index, 1);
            _this.sureButton(arr, obj);
          }
        });
      },

      //跳转到角色授权页面
      getAuth() {
        let authURL = doMain.base + RoleProtocal.authorization.rest
        let authRequest = RoleProtocal.authorization.request;
        authRequest.passportId = store.passport.passportId;
        // authRequest.passportName = store.passport.passportName;
        // authRequest.orgaId = store.passport.orgaId;
        // authRequest.orgaName = store.passport.orgaName;
        // authRequest.realName = store.passport.realName;
        authRequest.token = '';
        authRequest.id = store.roleId;
        let _this = this;
        console.log(authRequest);
        axiosHttpPost(this, authURL, authRequest, (res) => {
          
          if (res.data.status == "OK") {
            let item = res.data;
            _this.store.configForm = item.result;
            console.log(_this.store.configForm);
            console.log(_this.store.configForm.menuList);
            _this.authTreeMenuList[0].subMenuList = _this.setData(_this.store.configForm.menuList, 0); //菜单列表 id 
            let tree = this.setAuthTree(_this.authTreeMenuList);  //传入权限菜单列表对象  返回tree
            // console.log(tree);
            // if(item.result.refreshRole.menuList != null && item.result.refreshRole.menuList != ''){
            //   item.result.refreshRole.menuList = eval("(" + item.result.refreshRole.menuList + ")");
            // }
            let authBack = item.result.refreshRole.menuList; //角色菜单列表
            let authTree = document.getElementById('authTree');  //权限树DOM
            if (tree != '') {
              authTree.innerHTML = tree;
            }
            if (authBack !== null && authBack !== '') {
              $('#authTree').children('.el-tree-node').children('.el-tree-node__content').children('.el-checkbox').children('.el-checkbox__input').addClass('is-checked');
              let menuList = _this.getMenuId(authBack);
              let buttonList = _this.getButtonId(authBack);
              let menuSet = $('.menuList');
              let buttonSet = $('.buttonMenu');
              for (let i = 0; i < menuSet.length; i++) {
                for (let j = 0; j < menuList.length; j++) {
                  if (menuSet.eq(i).data('id') == menuList[j]) {
                    menuSet.eq(i).addClass('is-checked');
                  }
                }
              }
              for (let i = 0; i < buttonSet.length; i++) {
                for (let j = 0; j < buttonList.length; j++) {
                  if (buttonSet.eq(i).data('id') == buttonList[j]) {
                    buttonSet.eq(i).addClass('is-checked');
                  }
                }
              }
            }else{
              let menuSet = $('.menuList');
              let buttonSet = $('.buttonMenu');
              for (let i = 0; i < menuSet.length; i++) {
                menuSet.eq(i).removeClass('is-checked');
              }
              for (let i = 0; i < buttonSet.length; i++) {
                buttonSet.eq(i).removeClass('is-checked');
              }
            }
          } else {
            this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            });
          }

        })
      },

      buttonSure: function ($obj) {
        if ($obj.parent().siblings('.el-tree-node').length !== 0) {
          let $siblings = $obj.parent().siblings('.el-tree-node');
          let check = false;
          for (let i = 0; i < $siblings.length; i++) {
            let checkbox = $siblings.eq(i).children('.el-tree-node__content').children('.el-checkbox').children('.el-checkbox__input');
            if (checkbox.hasClass('is-checked') == true) {
              check = true;
            }
          }
          if (check) {
            return false;
          } else {
            $obj.parent().parent().siblings('.el-tree-node__content').children('.el-checkbox').children('.el-checkbox__input').removeClass('is-checked');
            this.buttonSure($obj.parent().parent());
          }
        } else {
          $obj.parent().parent().siblings('.el-tree-node__content').children('.el-checkbox').children('.el-checkbox__input').removeClass('is-checked');
          if ($obj.parent().parent().hasClass('el-tree-node__children') === true) {
            this.buttonSure($obj.parent().parent());
          } else {
            return false;
          }
        }
      },

      setButtonSelect: function ($obj) {
        if ($obj.parent().parent().hasClass('el-tree-node__children') == true) {
          $obj.parent().parent().siblings('.el-tree-node__content').children('.el-checkbox').children('.el-checkbox__input').addClass('is-checked');
          this.setButtonSelect($obj.parent().parent().siblings('.el-tree-node__content'));
        } else {
          return false;
        }
      },

      // 设置权限页面的树
      setAuthTree: function (obj) {
        if (this.authTreeIndent == 0) {
          this.authTreeIndent = 1;
        }
        let tree = '';
        for (let item of obj) {
          if (item.subMenuList.length !== 0) {
            tree += `<div class="el-tree-node" style="padding-left:`
            tree = tree + (this.authTreeIndent * 19) + `px">`   //父级元素的展示
            tree += `<div class="el-tree-node__content">
                        <span class="el-tree-node__expand-icon expanded"></span>
                        <label class="el-checkbox">
                            <span class="el-checkbox__input menuList" data-id="`
            tree = tree + item.id + `">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" class="el-checkbox__original" value="">
                        </span>
                    </label>
                    <span class="el-tree-node__label">`
            tree = tree + item.name + `</span>
                    </div>`
            tree += `<div class="el-tree-node__children">`
            tree += this.setAuthTree(item.subMenuList); // 遍历子层结构
            tree += `</div>
                    </div>`
          } else {
            tree += `<div class="el-tree-node" style="padding-left:`
            tree = tree + (this.authTreeIndent * 19) + `px">`
            tree += `<div class="el-tree-node__content">
                    <span class="el-tree-node__expand-icon expanded"></span>
                    <label class="el-checkbox">
                        <span class="el-checkbox__input menuList" data-id="` + item.id + `">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" class="el-checkbox__original" value="">
                        </span>
                    </label>
                    <span class="el-tree-node__label">` + item.name + `</span>
                </div>`
            tree += `<div class="el-tree-node__children">
                <div class="el-tree-node" style="padding-left:`
            this.authTreeIndent++;
            tree = tree + '25px;margin-left:' + (this.authTreeIndent * 10) + `px;border:1px #ddd dashed">`
            this.authTreeIndent--;
            let counts = 0;
            for (let val of item.buttonList) {
              if (counts == 5) {
                tree += `<br/>`;
                counts = 0;
              }
              counts++;
              tree += `<label class="el-checkbox" style="padding:7px 0;">
                    <span class="el-checkbox__input buttonMenu authSelect" data-id="` + val.id + `">
                        <span class="el-checkbox__inner"></span>
                        <input type="checkbox" class="el-checkbox__original" value="">
                    </span>
                </label>
                <span style="padding:7px 0; width:80px; display: inline-block;" class="el-tree-node__label">` + val.name + `</span>`;
            }
            tree += `</div>
        </div>
    </div>`
          }
        }
        return tree;
      },

      getMenuId: function (arr) {
        let array = [];
        for (let item of arr) {
          if (item.subMenuList.length == 0) {
            array.push(item.id);
          } else {
            array.push(item.id);
            let arrayMin = this.getMenuId(item.subMenuList);
            for (let item of arrayMin) {
              array.push(item);
            }
          }
        }
        return array;
      },
      handleClick(){

      },
      // 页面内跳转权限时加载的函数 //
      setData(obj, pId) {
        let data = [];
        for (let item of obj) {
          if (item.parentId == pId) {
            item.subMenuList = this.setData(obj, item.id);
            data.push(item);
          }
        }
        return data;
      },
      // 获取按钮的id
      getButtonId: function (arr) {
        let array = [];
        for (let item of arr) {
          if (item.subMenuList.length == 0) {
            for (let val of item.buttonList) {
              array.push(val.id);
            }
          } else {
            let arrayMin = this.getButtonId(item.subMenuList);
            for (let item of arrayMin) {
              array.push(item);
            }
          }
        }
        return array;
      },

      //授权
      auth() {
        let refreshAuthURL = doMain.base + RoleProtocal.refreshAuth.rest
        let refreshAuthRequest = RoleProtocal.refreshAuth.request;
        refreshAuthRequest.passportId = store.passport.passportId;
        // refreshAuthRequest.passportName = store.passport.passportName;
        // refreshAuthRequest.orgaId = store.passport.orgaId;
        // refreshAuthRequest.orgaName = store.passport.orgaName;
        // refreshAuthRequest.realName = store.passport.realName;
        refreshAuthRequest.token = '';
        refreshAuthRequest.id = store.roleId;
        refreshAuthRequest.menuList = this.sendAuth;
        let _this = this;
        console.log(refreshAuthRequest);
        axiosHttpPost(this, refreshAuthURL, refreshAuthRequest, (res) => {
          // hgFuc.resultTrue(this,res,'授权成功！');
          console.log(res);
          let item = res.data;
            if (item.result) {
              this.store.dialogAuth = false;
              this.message({ title: '成功', message: '授权成功', type: 'success' })
            }
        })
        // .then((res) => {
        //   // hgFuc.resultTrue(this,res,'授权成功！');
        //   let item = res.data;
        //     if (item.result) {
        //       _this.store.dialogAuth = false;
        //     }
        // });
      }
    }
  }
</script>

<style>
  #roleDialog .el-dialog--small .el-tree-node {
    overflow-x: auto;
    /*width: 500px;*/
    padding-right: 10px;
  }

  #roleDialog .el-dialog--small .el-tree-node__label {
    margin-right: 20px;
  }

  #roleDialog .el-dialog--small .el-checkbox__inner {
    top: 2px;
  }
  #roleDialog .rolePow {
    padding-bottom: 15px;
  }
</style>
