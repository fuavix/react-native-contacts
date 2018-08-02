/**
 * Created by xhw on 2018/7/19 14:15
 */
import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import Device from './utils/Device'
import SeparatorLine from './components/SeparatorLine'

export default class RecordSearch extends Component {
  /*static navigationOptions = ({ navigation }) => ({
   headerRight: (
   <TouchableOpacity
   style={{marginRight:10}}
   activeOpacity={0.7}
   onPress={_.debounce(() => { navigation.navigate('searchPage') }, 1000, { leading: true })}
   >
   <Image source={images.search.search} />
   </TouchableOpacity>
   )
   })*/

  constructor(props) {
    super(props)
    this.state = {
      contacts: [
        {index: 0, id: 0, name: '', label: 'A'},
        {index: 1, id: 101, name: '阿菊', label: 'A'},
        {index: 2, id: 102, name: '爱莲', label: 'A'},
        {index: 3, id: 103, name: '昂立拉克', label: 'A'},
        {index: 4, id: 0, name: '', label: 'B'},
        {index: 5, id: 104, name: '冰冰', label: 'B'},
        {index: 6, id: 105, name: '贝贝', label: 'B'},
        {index: 7, id: 0, name: '', label: 'C'},
        {index: 8, id: 106, name: '陈伟', label: 'C'},
        {index: 9, id: 107, name: '程浩', label: 'C'},
        {index: 10, id: 0, name: '', label: 'D'},
        {index: 11, id: 108, name: '点啥', label: 'D'},
        {index: 12, id: 109, name: '到啥', label: 'D'},
        {index: 13, id: 0, name: '', label: 'E'},
        {index: 14, id: 108, name: '鄂啥', label: 'E'},
        {index: 15, id: 108, name: '峨啥', label: 'E'},
        {index: 16, id: 0, name: '', label: 'F'},
        {index: 17, id: 108, name: '方啥', label: 'F'},
        {index: 18, id: 108, name: '付啥', label: 'F'},
        {index: 19, id: 108, name: '丰啥', label: 'F'},
        {index: 20, id: 0, name: '', label: 'G'},
        {index: 21, id: 108, name: '关啥', label: 'G'},
        {index: 22, id: 108, name: '高啥', label: 'G'},
        {index: 23, id: 0, name: '', label: 'H'},
        {index: 24, id: 108, name: '黄啥', label: 'H'},
        {index: 25, id: 0, name: '', label: 'J'},
        {index: 26, id: 108, name: '解啥', label: 'J'},
      ],
      labels: [{label: '#', position: 0},
        {label: 'A', position: 0}, {label: 'B', position: 4}, {label: 'C', position: 7}, {label: 'D', position: 10}, {label: 'E', position: 13}, {label: 'F', position: 16}, {label: 'G', position: 20},
        {label: 'H', position: 23}, {label: 'I', position: 0}, {label: 'J', position: 25}, {label: 'K', position: 0}, {label: 'L', position: 0}, {label: 'M', position: 0}, {label: 'N', position: 0},
        {label: 'O', position: 0}, {label: 'P', position: 0}, {label: 'Q', position: 0}, {label: 'R', position: 0}, {label: 'S', position: 0}, {label: 'T', position: 0},
        {label: 'U', position: 0}, {label: 'V', position: 0}, {label: 'W', position: 0}, {label: 'X', position: 0}, {label: 'Y', position: 0}, {label: 'Z', position: 0}
      ],
      testData: [
        {id: 100, name: '张三'},{id: 101, name: '李四'},{id: 102, name: '王五'}
      ]

    }
  }
  componentWillMount() {
    // 网上方法常见方法一
    function pySegSort(arr) {
      let letters = "abcdefghjklmnopqrstwxyz".split('');
      let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

      let segs = [];
      let curr;
      letters.map((l,i) => {
        curr = {letter: l, data:[]};
        arr.map((a) => {
          if(a.localeCompare(zh[i], 'zh') >= 0  && ( i === letters.length -1 || a.localeCompare(zh[i+1], 'zh') < 0)) {
            curr.data.push(a);
          }
        })
        if(curr.data.length) {
          segs.push(curr);
          curr.data.sort(function(a,b){
            return a.localeCompare(b, 'zh');
          });
        }
      })
      console.log("=== segs ===", JSON.stringify(segs))
      return segs;
    }
    JSON.stringify(pySegSort(["我","不","懂","爱","啊","按","已","呀","选","县"]))
  }
  componentDidMount() {
    // 网上方法常见方法二
    function chineseLetter (arr, dataLeven) {
      let letter = 'abcdefghjklmnopqrstwxyz'.split('')
      let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('')
      /* 获取数组元素比较的值 */
      function getValue (option) {
        if (!dataLeven) return option
        let data = option
        dataLeven.split('.').filter(function (item) {
          data = data[item]
        })
        return data + ''
      }
      /* 进行排序 */
      arr.sort(function (item1, item2) {
        return getValue(item1).localeCompare(getValue(item2), 'zh-Hans-CN')
      })
      /* 判断需要排序的字符串是否含有中文字符 */
      if (/[\u4e00-\u9fff]/.test(getValue(arr[0])) && typeof arr[0] === 'object') pySegSort(0, 0)
      /* 给省列表中添加首字符 */
      function pySegSort (letterIndex, zhIndex) {
        let first = true // 首次是否加 字母标识
        for (let i = zhIndex; i < arr.length; i++) {
          let item = arr[i]
          //      是否有值 && 当前值大于等于本次字母的最小值 && (最后一位 || 当前值小于下次字母的最小值)
          let state = zh[letterIndex] && getValue(item).localeCompare(zh[letterIndex], 'zh') >= 0 && (letterIndex === letter.length - 1 || getValue(item).localeCompare(zh[letterIndex+1], 'zh') < 0)
          if (state) { // 满足条件，同一个首字母下的：例如 A 下的所有省份
            if (first) { //是否是第一次出现
              item.letter = letter[letterIndex].toUpperCase()
              first = false
            } else {
              item.letter = ''
            }
          } else { // 递归调用 函数，进行下次字母下的排列
            letterIndex++
            if (letterIndex < letter.length) {
              pySegSort(letterIndex, i)
              break
            }
          }
        }
      }
    }
    const provinceList = [
      {code: "42", value: "湖北", letter: ""},
      {code: "43", value: "湖南", letter: ""},
      {code: "21", value: "辽宁", letter: "L"},
      {code: "15", value: "内蒙古", letter: "N"},
      {code: "64", value: "宁夏", letter: ""},
      {code: "63", value: "青海", letter: "Q"},
      {code: "34", value: "安徽", letter: "A"},
      {code: "82", value: "澳门", letter: ""},
      {code: "11", value: "北京", letter: "B"},
      {code: "50", value: "重庆", letter: "C"},
      {code: "35", value: "福建", letter: "F"},
      {code: "62", value: "甘肃", letter: "G"},
      {code: "44", value: "广东", letter: ""},
      {code: "22", value: "吉林", letter: "J"},
      {code: "33", value: "浙江", letter: "Z"},
      {code: "32", value: "江苏", letter: ""},
      {code: "36", value: "江西", letter: ""},
      {code: "31", value: "上海", letter: ""},
      {code: "51", value: "四川", letter: ""},
      {code: "71", value: "台湾", letter: "T"},
      {code: "12", value: "天津", letter: ""},
      {code: "54", value: "西藏", letter: "X"},
      {code: "81", value: "香港", letter: ""},
      {code: "65", value: "新疆", letter: ""},
      {code: "53", value: "云南", letter: "Y"},
      {code: "45", value: "广西", letter: ""},
      {code: "52", value: "贵州", letter: ""},
      {code: "46", value: "海南", letter: "H"},
      {code: "13", value: "河北", letter: ""},
      {code: "41", value: "河南", letter: ""},
      {code: "23", value: "黑龙江", letter: ""},
      {code: "37", value: "山东", letter: "S"},
      {code: "14", value: "山西", letter: ""},
      {code: "61", value: "陕西", letter: ""}
    ]
    chineseLetter(provinceList, 'value')
    console.log(JSON.stringify(provinceList))
// 结果如下：
    /*[
     {code: "34", value: "安徽", letter: "A"}
     {code: "82", value: "澳门", letter: ""}
     {code: "11", value: "北京", letter: "B"}
     {code: "50", value: "重庆", letter: "C"}
     {code: "35", value: "福建", letter: "F"}
     {code: "62", value: "甘肃", letter: "G"}
     {code: "44", value: "广东", letter: ""}
     {code: "45", value: "广西", letter: ""}
     {code: "52", value: "贵州", letter: ""}
     {code: "46", value: "海南", letter: "H"}
     {code: "13", value: "河北", letter: ""}
     {code: "41", value: "河南", letter: ""}
     {code: "23", value: "黑龙江", letter: ""}
     {code: "42", value: "湖北", letter: ""}
     {code: "43", value: "湖南", letter: ""}
     {code: "22", value: "吉林", letter: "J"}
     {code: "32", value: "江苏", letter: ""}
     {code: "36", value: "江西", letter: ""}
     {code: "21", value: "辽宁", letter: "L"}
     {code: "15", value: "内蒙古", letter: "N"}
     {code: "64", value: "宁夏", letter: ""}
     {code: "63", value: "青海", letter: "Q"}
     {code: "37", value: "山东", letter: "S"}
     {code: "14", value: "山西", letter: ""}
     {code: "61", value: "陕西", letter: ""}
     {code: "31", value: "上海", letter: ""}
     {code: "51", value: "四川", letter: ""}
     {code: "71", value: "台湾", letter: "T"}
     {code: "12", value: "天津", letter: ""}
     {code: "54", value: "西藏", letter: "X"}
     {code: "81", value: "香港", letter: ""}
     {code: "65", value: "新疆", letter: ""}
     {code: "53", value: "云南", letter: "Y"}
     {code: "33", value: "浙江", letter: "Z"}
     ]*/

    // 排序并添加首字母 二合一
    function pySegSort(arr) {
      const letters = "abcdefghjklmnopqrstwxyz".split('')
      const zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('')
      let segs = []
      let curr

      letters.map((l,i) => {
        curr = {letter: l.toUpperCase(), data:[]}
        arr.map((a) => {
          if(a.value.localeCompare(zh[i], 'zh') >= 0  && ( i === letters.length -1 || a.value.localeCompare(zh[i+1], 'zh') < 0)) {
            curr.data.push(a)
          }
        })
        if(curr.data.length) {
          segs.push(curr);
          curr.data.sort(function(a,b){
            return a.value.localeCompare(b.value, 'zh');
          });
        }
      })
      console.log("=== segs ===", JSON.stringify(segs))
      return segs
    }
    const provinceList = [
      {code: "42", value: "湖北", letter: ""},
      {code: "43", value: "湖南", letter: ""},
      {code: "21", value: "辽宁", letter: "L"},
      {code: "15", value: "内蒙古", letter: "N"},
      {code: "64", value: "宁夏", letter: ""},
      {code: "63", value: "青海", letter: "Q"},
      {code: "34", value: "安徽", letter: "A"},
      {code: "82", value: "澳门", letter: ""},
      {code: "11", value: "北京", letter: "B"},
      {code: "50", value: "重庆", letter: "C"},
      {code: "35", value: "福建", letter: "F"},
      {code: "62", value: "甘肃", letter: "G"},
      {code: "44", value: "广东", letter: ""},
      {code: "22", value: "吉林", letter: "J"},
      {code: "33", value: "浙江", letter: "Z"},
      {code: "32", value: "江苏", letter: ""},
      {code: "36", value: "江西", letter: ""},
      {code: "31", value: "上海", letter: ""},
      {code: "51", value: "四川", letter: ""},
      {code: "71", value: "台湾", letter: "T"},
      {code: "12", value: "天津", letter: ""},
      {code: "54", value: "西藏", letter: "X"},
      {code: "81", value: "香港", letter: ""},
      {code: "65", value: "新疆", letter: ""},
      {code: "53", value: "云南", letter: "Y"},
      {code: "45", value: "广西", letter: ""},
      {code: "52", value: "贵州", letter: ""},
      {code: "46", value: "海南", letter: "H"},
      {code: "13", value: "河北", letter: ""},
      {code: "41", value: "河南", letter: ""},
      {code: "23", value: "黑龙江", letter: ""},
      {code: "37", value: "山东", letter: "S"},
      {code: "14", value: "山西", letter: ""},
      {code: "61", value: "陕西", letter: ""}
    ]
    pySegSort(provinceList)
  }



  render() {

    const { contacts, labels } = this.state
    const scollTo = (item) => {
      if (item.label === '#') {
        this._flatList.scrollToEnd()
      } else {
        // 当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
        this._flatList.scrollToIndex({viewPosition:1,index:item.position})
      }

    }
    const renderItem = ({item}) => {
      const onPress = () => {
        alert(JSON.stringify(item))
      }
      return (
        item.id ?
          <TouchableOpacity style={styles.listItem} onPress={onPress}>
            <Text style={styles.itemName}>{`${item.name}`}</Text>
          </TouchableOpacity> :
          <View style={styles.labelItem}>
            <Text style={styles.itemLabel}>{`${item.label}`}</Text>
          </View>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList data={contacts}
                  keyExtractor={(item, index) => index + ''}
                  ref={(flatList)=>this._flatList = flatList}
                  ItemSeparatorComponent={() => <SeparatorLine />}
                  showsVerticalScrollIndicator = {false}
                  renderItem={renderItem}/>
        <View style={styles.slideCtn}>
          {labels.map((item) =>
            <TouchableOpacity
              key={item.label}
              style={styles.labelCtn}
              onPress={()=> scollTo(item)}>
              <Text style={styles.slideLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  listItem: {
    height: Device.scale(45),
    justifyContent: 'center'
  },
  labelItem: {
    height: Device.scale(28),
    justifyContent: 'center',
    backgroundColor: '#E9ECF5',
  },
  itemLabel: {
    fontSize: Device.scale(17),
    color: '#4C5361',
    marginLeft: Device.scale(10),
    fontWeight: 'bold'
  },
  itemName: {
    fontSize: Device.scale(16),
    color: '#4C5361',
    marginLeft: Device.scale(10)
  },
  slideCtn: {
    top: Device.scale(80),
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  labelCtn: {
    paddingLeft: Device.scale(2),
    paddingRight: Device.scale(2)
  },
  slideLabel: {
    color: 'rgb(32,130,255)',
    fontSize: Device.scale(10),
  },
})