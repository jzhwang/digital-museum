/**
 * 预设的文物图片数据库
 * 使用 Wikimedia Commons 高质量图片，确保可靠性和稳定性
 */

interface PresetImage {
  name: string;
  aliases: string[];  // 别名（中文、英文、繁体等）
  imageUrl: string;
  source: string;
  category?: string;  // 分类：中国、西方、古埃及等
}

export const PRESET_IMAGES: PresetImage[] = [
  // ============ 中国古代文物 ============
  {
    name: "司母戊鼎",
    aliases: ["后母戊鼎", "司母戊大方鼎", "后母戊大方鼎"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/HouMuWuDingFullView.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "四羊方尊",
    aliases: ["四羊方罍"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/20251026_Four-goat_Square_Zun_02.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "越王勾践剑",
    aliases: ["勾践剑", "越王剑"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/20230208_Bronze_sword_used_by_King_Goujian_of_Yue_02.jpg",
    source: "Wikimedia Commons",
    category: "中国兵器"
  },
  {
    name: "曾侯乙编钟",
    aliases: ["编钟", "曾侯乙墓编钟"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/20230208_Chime_bells_of_Marquis_Yi_of_Zeng.jpg",
    source: "Wikimedia Commons",
    category: "中国乐器"
  },
  {
    name: "秦始皇兵马俑",
    aliases: ["兵马俑", "秦俑", "兵马俑坑", "Terracotta Army"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/51714-Terracota-Army.jpg",
    source: "Wikimedia Commons",
    category: "中国雕塑"
  },
  {
    name: "金缕玉衣",
    aliases: ["中山靖王金缕玉衣", "玉衣"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Xihan_Tomb_1_Jade_Burial_Suit.JPG",
    source: "Wikimedia Commons",
    category: "中国玉器"
  },
  {
    name: "清明上河图",
    aliases: ["清明上河圖", "Along the River During Qingming Festival"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Bianjing_city_gate.JPG",
    source: "Wikimedia Commons",
    category: "中国绘画"
  },
  {
    name: "富春山居图",
    aliases: ["富春山居圖"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/%E5%AF%8C%E6%98%A5%E5%B1%B1%E5%B1%85%E5%9C%96%28%E5%89%A9%E5%B1%B1%E5%9C%96%29.jpg",
    source: "Wikimedia Commons",
    category: "中国绘画"
  },
  {
    name: "三星堆青铜面具",
    aliases: ["三星堆面具", "青铜面具", "三星堆大立人"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Sanxingdui_Oct_2007_557.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "长信宫灯",
    aliases: ["宫灯"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/%E9%95%BF%E4%BF%A1%E5%AE%AB%E7%81%AF%E6%AD%A3%E9%9D%A2%E7%85%A7.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "马踏飞燕",
    aliases: ["铜奔马", "马超龙雀"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/25/Gansu_Museum_2007_257.jpg",
    source: "Wikimedia Commons",
    category: "中国雕塑"
  },
  {
    name: "何尊",
    aliases: ["西周何尊"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/He_Zun.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "大克鼎",
    aliases: ["克鼎"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Da_Ke_ding.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "毛公鼎",
    aliases: ["毛公彝"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Ding_cauldron_of_Duke_Mao.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "翠玉白菜",
    aliases: ["翡翠白菜", "玉白菜"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/Jadeite_Cabbage%2C_National_Palace_Museum.jpg",
    source: "Wikimedia Commons",
    category: "中国玉器"
  },
  {
    name: "肉形石",
    aliases: ["东坡肉石"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Meat-Shaped_Stone_Gathering_of_Treasures_1.jpg",
    source: "Wikimedia Commons",
    category: "中国玉器"
  },

  // ============ 欧洲艺术品 ============
  {
    name: "蒙娜丽莎",
    aliases: ["Mona Lisa", "La Gioconda", "达芬奇的蒙娜丽莎"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "最后的晚餐",
    aliases: ["The Last Supper", "達文西最後的晚餐"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "大卫像",
    aliases: ["David", "米开朗基罗的大卫", "大衛"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/26/Michelangelo%27s_David_2021_-_1.jpg",
    source: "Wikimedia Commons",
    category: "西方雕塑"
  },
  {
    name: "米洛的维纳斯",
    aliases: ["Venus de Milo", "断臂维纳斯", "维纳斯雕像"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/V%C3%A9nus_de_Milo_-_Mus%C3%A9e_du_Louvre_AGER_LL_299_%3B_N_527_%3B_Ma_399.jpg",
    source: "Wikimedia Commons",
    category: "西方雕塑"
  },
  {
    name: "胜利女神像",
    aliases: ["萨莫色雷斯的胜利女神", "Nike of Samothrace", "Winged Victory"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg",
    source: "Wikimedia Commons",
    category: "西方雕塑"
  },
  {
    name: "思想者",
    aliases: ["The Thinker", "沉思者", "罗丹的思想者"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mus%C3%A9e_Rodin_1.jpg",
    source: "Wikimedia Commons",
    category: "西方雕塑"
  },
  {
    name: "创世纪",
    aliases: ["Creation of Adam", "创造亚当", "西斯廷教堂天顶画"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Sistine_chapel.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "星空",
    aliases: ["The Starry Night", "星夜", "梵高的星空"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "向日葵",
    aliases: ["Sunflowers", "梵高的向日葵"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "呐喊",
    aliases: ["The Scream", "尖叫", "蒙克的呐喊"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "戴珍珠耳环的少女",
    aliases: ["Girl with a Pearl Earring", "珍珠耳环少女", "维米尔的少女"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "格尔尼卡",
    aliases: ["Guernica", "毕加索的格尔尼卡"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/zh/7/74/PicassoGuernica.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },

  // ============ 古埃及文物 ============
  {
    name: "罗塞塔石碑",
    aliases: ["Rosetta Stone", "罗塞达石碑", "羅塞塔石碑"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Rosetta_Stone.JPG",
    source: "Wikimedia Commons",
    category: "古埃及"
  },
  {
    name: "图坦卡蒙黄金面具",
    aliases: ["Tutankhamun Mask", "法老面具", "图坦卡门面具"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg",
    source: "Wikimedia Commons",
    category: "古埃及"
  },
  {
    name: "纳芙蒂蒂胸像",
    aliases: ["Nefertiti Bust", "娜芙蒂蒂", "美人头像"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Nofretete_Neues_Museum.jpg",
    source: "Wikimedia Commons",
    category: "古埃及"
  },
  {
    name: "阿布辛贝神庙",
    aliases: ["Abu Simbel", "拉美西斯二世神庙"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Abu_Simbel_Main_Temple_%282346939149%29.jpg",
    source: "Wikimedia Commons",
    category: "古埃及"
  },

  // ============ 希腊罗马文物 ============
  {
    name: "掷铁饼者",
    aliases: ["Discobolus", "擲鐵餅者"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Roman_bronze_copy_of_Myron%E2%80%99s_Discobolos%2C_2nd_century_CE_%28Glyptothek_Munich%29.jpg",
    source: "Wikimedia Commons",
    category: "古希腊"
  },
  {
    name: "拉奥孔群像",
    aliases: ["Laocoön and His Sons", "拉奥孔"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Laocoon_Pio-Clementino_Inv1059-1064-1067.jpg",
    source: "Wikimedia Commons",
    category: "古罗马"
  },
  {
    name: "奥古斯都雕像",
    aliases: ["Augustus of Prima Porta", "第一公民奥古斯都"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Augustus_of_Prima_Porta.jpg",
    source: "Wikimedia Commons",
    category: "古罗马"
  },

  // ============ 日本文物 ============
  {
    name: "神奈川冲浪里",
    aliases: ["The Great Wave", "浮世绘神奈川冲浪", "葛饰北斋"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg",
    source: "Wikimedia Commons",
    category: "日本浮世绘"
  },

  // ============ 其他著名文物 ============
  {
    name: "自由女神像",
    aliases: ["Statue of Liberty", "自由女神"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Front_view_of_Statue_of_Liberty_with_pedestal_and_base_2024.jpg",
    source: "Wikimedia Commons",
    category: "现代雕塑"
  },
  {
    name: "复活节岛石像",
    aliases: ["Moai", "摩艾石像", "Easter Island Statues"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Rano_Raraku_quarry.jpg",
    source: "Wikimedia Commons",
    category: "南美文明"
  },
  {
    name: "雅典娜神庙",
    aliases: ["帕特农神庙", "Parthenon", "帕德嫩神庙"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/The_Parthenon_in_Athens.jpg",
    source: "Wikimedia Commons",
    category: "古希腊建筑"
  },
  {
    name: "死海古卷",
    aliases: ["Dead Sea Scrolls", "死海卷軸"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Psalms_Scroll.jpg",
    source: "Wikimedia Commons",
    category: "古代文献"
  },

  // ============ 新增博物馆馆藏文物 ============

  // 中国博物馆馆藏
  {
    name: "鎏金舞马衔杯纹银壶",
    aliases: ["舞马衔杯银壶", "唐代银壶"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Gilt_silver_jar_with_pattern_of_dancing_horses.jpg",
    source: "待补充",
    category: "中国金银器"
  },
  {
    name: "红山文化玉龙",
    aliases: ["C形玉龙", "红山玉猪龙"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Neolithic_jade_dragon%2C_Hongshan_Culture%2C_Inner_Mongolia%2C_1971.jpg",
    source: "Wikimedia Commons",
    category: "中国玉器"
  },
  {
    name: "步辇图",
    aliases: ["阎立本步辇图"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Buliantu.jpg",
    source: "Wikimedia Commons",
    category: "中国绘画"
  },
  {
    name: "唐三彩骆驼",
    aliases: ["三彩载乐骆驼", "唐三彩"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/20251026_Sancai-glazed_Pottery_Musician_on_Camelback.jpg",
    source: "Wikimedia Commons",
    category: "中国陶瓷"
  },
  {
    name: "永乐大钟",
    aliases: ["华严钟", "大钟寺永乐大钟"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/%E6%B0%B8%E4%B9%90%E5%A4%A7%E9%92%9F%E6%AD%A3%E9%9D%A2.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "虢季子白盘",
    aliases: ["子白盘"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Guojizibai_pan_01.jpg",
    source: "Wikimedia Commons",
    category: "中国青铜器"
  },
  {
    name: "五牛图",
    aliases: ["韩滉五牛图"],
    imageUrl: "https://zh.wikipedia.org/wiki/%E4%BA%94%E7%89%9B%E5%9C%96#/media/File:%E9%9F%A9%E6%BB%89%E4%BA%94%E7%89%9B%E5%9B%BE%E5%8D%B7.png",
    source: "Wikimedia Commons",
    category: "中国绘画"
  },
  {
    name: "永乐青花瓷",
    aliases: ["明永乐青花", "永乐压手杯"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Chinese_-_Pair_of_Vases_with_European_Women_-_Walters_491913%2C_491914.jpg",
    source: "Wikimedia Commons",
    category: "中国陶瓷"
  },

  // 欧美博物馆馆藏
  {
    name: "夜巡",
    aliases: ["Night Watch", "伦勃朗的夜巡"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/The_Night_Watch_-_HD.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "吻",
    aliases: ["The Kiss", "克林姆特的吻"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "自由引导人民",
    aliases: ["Liberty Leading the People", "德拉克洛瓦"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/La_Libert%C3%A9_guidant_le_peuple_-_Eug%C3%A8ne_Delacroix_-_Mus%C3%A9e_du_Louvre_Peintures_RF_129_-_apr%C3%A8s_restauration_2024.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "睡莲",
    aliases: ["Water Lilies", "莫奈睡莲"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Claude_Monet_038.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "拾穗者",
    aliases: ["The Gleaners", "米勒的拾穗者"],
    imageUrl: "https://zh.wikipedia.org/wiki/%E6%8B%BE%E7%A9%97#/media/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "记忆的永恒",
    aliases: ["The Persistence of Memory", "融化的钟表", "达利"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/zh/d/dd/The_Persistence_of_Memory.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },
  {
    name: "维特鲁威人",
    aliases: ["Vitruvian Man", "人体比例图", "达芬奇"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg",
    source: "Wikimedia Commons",
    category: "西方绘画"
  },

  // 其他地区博物馆馆藏
  {
    name: "阿兹特克太阳石",
    aliases: ["Sun Stone", "阿兹特克历法石", "太阳历石"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Piedra_del_Sol_en_MNA.jpg",
    source: "Wikimedia Commons",
    category: "美洲文明"
  },
  {
    name: "刘易斯棋子",
    aliases: ["Lewis Chessmen", "维京棋子"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/UigChessmen_SelectionOfKings.jpg",
    source: "Wikimedia Commons",
    category: "中世纪"
  }
];

/**
 * 根据文物名称查找预设图片
 * 支持模糊匹配和别名匹配
 */
export function findPresetImage(artifactName: string): PresetImage | null {
  if (!artifactName || artifactName.trim() === "") return null;

  const normalizedName = artifactName.trim().toLowerCase();

  for (const preset of PRESET_IMAGES) {
    // 1. 检查完全匹配
    if (preset.name.toLowerCase() === normalizedName) {
      return preset;
    }

    // 2. 检查主名称包含
    if (preset.name.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(preset.name.toLowerCase())) {
      return preset;
    }

    // 3. 检查别名
    for (const alias of preset.aliases) {
      const normalizedAlias = alias.toLowerCase();
      if (normalizedAlias === normalizedName ||
          normalizedAlias.includes(normalizedName) ||
          normalizedName.includes(normalizedAlias)) {
        return preset;
      }
    }
  }

  return null;
}

/**
 * 获取所有预设图片（用于管理和展示）
 */
export function getAllPresetImages(): PresetImage[] {
  return PRESET_IMAGES;
}

/**
 * 按分类获取文物
 */
export function getImagesByCategory(category: string): PresetImage[] {
  return PRESET_IMAGES.filter(img => img.category === category);
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const categories = new Set(PRESET_IMAGES.map(img => img.category).filter(Boolean));
  return Array.from(categories);
}
