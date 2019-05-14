export function randomString(len) {
    len = len || 32
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*(){}|><.[]'
    var maxPos = $chars.length
    var pwd = ''
    for (var i = 0; i < len; i++) {
      // 0~32的整数
      pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)))
    }
    return pwd
  }
  export function transFormTree(data, idName, pidName) {
    data.forEach((item) => {
      delete item.children
    })
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {}
    data.forEach((item) => {
      map[item[idName]] = item
    })
    var val = []
    data.forEach((item) => {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      var parent = map[item[pidName]]
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent.children || (parent.children = [])).push(item)
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item)
      }
    })
    return {
      val,
      map
    }
  }
  // 计算表达式的值
  export function evil(fn) {
    var Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)()
  }
  // 生成guid
  export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
  // 转换时间格式
  export const formatDate = (date) => {
    // 位数不足加0
    function add0(m){
      return m<10?'0'+m:m 
    }
    var d = new Date(date);  
    return d.getFullYear() + '-' + add0((d.getMonth() + 1)) + '-' + add0(d.getDate()); 
  }
  export const echartsEcidiColor = {
    color: [
      '#399aea',
      '#5ad8e5',
      '#addd52',
      '#ffcb27',
      '#f4a664',
      '#ed6b6b',
      '#9f6eff',
      '#6f62ff',
      '#00d186'
    ],
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textStyle: {},
    title: {
      textStyle: {
        color: '#333'
      },
      subtextStyle: {
        color: '#aaa'
      }
    },
    line: {
      itemStyle: {
        normal: {
          borderWidth: 1
        }
      },
      lineStyle: {
        normal: {
          width: 2
        }
      },
      symbolSize: 4,
      symbol: 'emptyCircle',
      smooth: false
    },
    radar: {
      itemStyle: {
        normal: {
          borderWidth: 1
        }
      },
      lineStyle: {
        normal: {
          width: 2
        }
      },
      symbolSize: 4,
      symbol: 'emptyCircle',
      smooth: false
    },
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        },
        emphasis: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        }
      }
    },
    pie: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    scatter: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    boxplot: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    parallel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    sankey: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    funnel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    gauge: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#c23531',
          color0: '#314656',
          borderColor: '#c23531',
          borderColor0: '#314656',
          borderWidth: 1
        }
      }
    },
    graph: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      lineStyle: {
        normal: {
          width: 1,
          color: '#aaa'
        }
      },
      symbolSize: 4,
      symbol: 'emptyCircle',
      smooth: false,
      color: [
        '#399aea',
        '#5ad8e5',
        '#addd52',
        '#ffcb27',
        '#f4a664',
        '#ed6b6b',
        '#9f6eff',
        '#6f62ff',
        '#00d186'
      ],
      label: {
        normal: {
          textStyle: {
            color: '#eee'
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: '#eee',
          borderColor: '#444',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#000'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(100,0,0)'
          }
        }
      }
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: '#eee',
          borderColor: '#444',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#000'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(100,0,0)'
          }
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333333'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#ccc']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#eeeeee']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#eeeeee']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#9f9f9f'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#eeeeee']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: '#999'
        },
        emphasis: {
          borderColor: '#666'
        }
      }
    },
    legend: {
      textStyle: {
        color: '#333333'
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#ccc',
          width: 1
        },
        crossStyle: {
          color: '#ccc',
          width: 1
        }
      }
    },
    timeline: {
      lineStyle: {
        color: '#293c55',
        width: 1
      },
      itemStyle: {
        normal: {
          color: '#293c55',
          borderWidth: 1
        },
        emphasis: {
          color: '#a9334c'
        }
      },
      controlStyle: {
        normal: {
          color: '#293c55',
          borderColor: '#293c55',
          borderWidth: 0.5
        },
        emphasis: {
          color: '#293c55',
          borderColor: '#293c55',
          borderWidth: 0.5
        }
      },
      checkpointStyle: {
        color: '#e43c59',
        borderColor: 'rgba(194,53,49, 0.5)'
      },
      label: {
        normal: {
          textStyle: {
            color: '#293c55'
          }
        },
        emphasis: {
          textStyle: {
            color: '#293c55'
          }
        }
      }
    },
    visualMap: {
      color: ['#bf444c', '#d88273', '#f6efa6']
    },
    dataZoom: {
      backgroundColor: 'rgba(47,69,84,0)',
      dataBackgroundColor: 'rgba(47,69,84,0.3)',
      fillerColor: 'rgba(167,183,204,0.4)',
      handleColor: '#a7b7cc',
      handleSize: '100%',
      textStyle: {
        color: '#333'
      }
    },
    markPoint: {
      label: {
        normal: {
          textStyle: {
            color: '#eee'
          }
        },
        emphasis: {
          textStyle: {
            color: '#eee'
          }
        }
      }
    }
  }
  export function textLengthCheck(input, limit) {
    if (input.length) {
      var len = 0
      for (let i = 0; i < input.length; i++) {
        const a = input.charAt(i)
        if (a.match('/[^\x00-\xff]/ig') != null) {
          len += 2
        } else {
          len += 1
        }
      }
    }
    if (len <= limit) {
      return len <= limit
    }
  }
  export function getTaskType(type) {
    switch (type) {
      case 'plan':
        return '项目策划'
      case 'analysis':
        return '需求分析'
      case 'code':
        return '程序开发'
      case 'test':
        return '软件测试'
      case 'doc':
        return '文档编写'
      case 'UI':
        return 'UI交互设计'
      case 'other':
        return '其他'
      default:
        return ''
    }
  }
  export function getProjectRecordType(type) {
    switch (type) {
      case 'newProject':
        return 'icon_project_record_new'
      case 'deleteTask':
        return 'icon_project_record_delete'
      case 'deleteMember':
        return 'icon_project_record_deletemember'
      case 'addMember':
        return 'icon_project_record_addmember'
      case 'newTask':
        return 'icon_project_record_new'
      case 'newProjectPlan':
        return 'icon_project_record_new'
      case 'name':
        return 'icon_project_record_edit'
      case 'progress':
        return 'icon_project_record_complete'
      case 'redo':
        return 'icon_project_record_edit'
      case 'projectPlan':
        return 'icon_project_record_edit'
      case 'editProject':
        return 'icon_project_record_edit'
      case 'description':
        return 'icon_project_record_edit'
      case 'state':
        return 'icon_project_record_edit'
      case 'principal':
        return 'icon_project_record_principal'
      case 'archived':
        return 'icon_project_archive'
        // case 'state':
        // return 'icon_project_record_edit'
      default:
        return 'icon_project_record_edit'
    }
  }
  export function getDocFileIcon(docName) {
    const fileType = docName.split('.')[docName.split('.').length - 1]
    switch (fileType) {
      case 'dir':
        return 'doc_folder'
      case 'docx':
        return 'doc_word'
      case 'doc':
        return 'doc_word'
      case 'pdf':
        return 'doc_pdf'
      case 'xlsx':
        return 'doc_excel'
      case 'rar':
        return 'doc_zip'
      case 'zip':
        return 'doc_zip'
      case 'ppt':
        return 'doc_ppt'
      case 'pptx':
        return 'doc_ppt'
      case 'txt':
        return 'doc_txt'
      case 'html':
        return 'doc_html'
      case 'exe':
        return 'doc_exe'
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'gif':
      case 'bmp':
        return 'doc_img'
      default:
        return 'doc_blank'
    }
  }
  