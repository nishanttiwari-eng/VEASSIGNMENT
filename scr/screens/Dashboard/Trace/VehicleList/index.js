import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {CustomStatusBar} from '../../../../components/CustomStatusBar';
import {Header} from '../../../../components/Header';
import {colors} from '../../../../utils/colors';
import style from './style';
import {Icon} from '../../../../utils/icons';
import {vehicleList} from '../../../../config/StaticData';
import {useFocusEffect} from '@react-navigation/native';

// Child Component
function TrackVehicle() {
  const carTypeSummary = vehicleList.reduce((acc, vehicle) => {
    const carTypeEntry = acc.find(entry => entry.carType === vehicle.carType);

    if (carTypeEntry) {
      carTypeEntry.carCount++;
    } else {
      acc.push({carType: vehicle.carType, carCount: 1});
    }

    return acc;
  }, []);

  return (
    <View
      style={{
        width: '90%',
        height: 70,
        borderRadius: 12,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
      }}>
      {carTypeSummary.map((i, ind) => {
        let carCountColor;

        if (i.carType === 'Running') {
          carCountColor = colors.runningBg;
        } else if (i.carType === 'Idle') {
          carCountColor = colors.yellowTxt;
        } else if (i.carType === 'Halt') {
          carCountColor = colors.redTxt;
        } else if (i.carType === 'Offline') {
          carCountColor = colors.blackTxt;
        }
        return (
          <View
            key={ind}
            style={{
              flex: 0.25,
              backgroundColor: colors.transparent,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '800',
                color: carCountColor,
              }}>
              {i.carCount}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.inActiveIconColor,
              }}>
              {i.carType}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// Child Component
function SearchVehicle({textInputRef, inputValue}) {
  const [vehicleListData, setVehicleListData] = useState();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
        height: 42,
      }}>
      <View
        style={{
          width: '72%',
          backgroundColor: 'white',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E4E4E4',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          ref={textInputRef}
          placeholder={'Search vehicle here'}
          maxLength={8}
          onChangeText={inputValue}
          // defaultValue={userPhoneNum}
          returnKeyType="done"
          keyboardType="email-address"
          placeholderTextColor={colors.inActiveIconColor}
          style={{
            borderRadius: 8,
            width: '85%',
            height: 40,
            textAlign: 'left',
            color: colors.blackTxt,
            alignSelf: 'flex-start',
            fontSize: 16,
            fontWeight: '600',
            paddingLeft: 10,
          }}
        />
        <Image
          source={Icon.chevronDown}
          style={{
            height: 24,
            width: 24,
            alignSelf: 'center',
            marginRight: 10,
          }}
        />
      </View>
      <View
        style={{
          height: 42,
          width: 42,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E4E4E4',
          borderRadius: 12,
          backgroundColor: colors.white,
        }}>
        <Image
          source={Icon.filter}
          style={{
            height: 24,
            width: 24,
          }}
        />
      </View>
      <View
        style={{
          height: 42,
          width: 42,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#E4E4E4',
          borderRadius: 12,
          backgroundColor: colors.white,
        }}>
        <Image
          source={Icon.arrowDown}
          style={{
            height: 24,
            width: 24,
          }}
        />
      </View>
    </View>
  );
}

// Main Function Component
const VehicleList = ({navigation}) => {
  // Create Reference
  const textInputRef = useRef(null);
  const scrollRef = useRef(null);

  // State calling
  const [vehicleListData, setVehicleListData] = useState(vehicleList);

  //Handle Scroll to top
  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true, // smooth scroll
      });
    }, []),
  );

  // Focus on the TextInput
  const handleSearchIconPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  // Remove focus on the Textfield
  const hanldeVehiclePress = item => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    navigation.navigate('VehicleDetailScreen', {item});
  };

  // Handle Vehicle search
  function handleSearch(text) {
    const lowercasedText = text ? text.toLowerCase() : '';
    if (text.length > 0) {
      // Filter the list based on the search text
      const filterData = vehicleList.filter(i => {
        const itemName = i.vehicleName ? i.vehicleName.toLowerCase() : '';
        return itemName.includes(lowercasedText);
      });

      // Update the state with the filtered data
      setVehicleListData(filterData);
    } else {
      // Update the state with the non filtered data
      setVehicleListData(vehicleList);
    }
  }

  // Empty Vehicle list render
  const renderEmptyView = () => {
    return (
      <View
        style={{
          height: '100%',
          width: '90%',
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: colors.blackTxt,
            textAlign: 'center',
          }}>
          {'No Data Found'}
        </Text>
      </View>
    );
  };

  // Vehicle list render
  function renderVehicleList({item}) {
    let warningColor;

    if (item?.carType === 'Running') {
      warningColor = colors.runningBg;
    } else if (item?.carType === 'Idle') {
      warningColor = colors.yellowTxt;
    } else if (item?.carType === 'Halt') {
      warningColor = colors.redTxt;
    } else if (item?.carType === 'Offline') {
      warningColor = colors.blackTxt;
    }

    return (
      <TouchableOpacity
        onPress={() => hanldeVehiclePress(item)}
        activeOpacity={0.7}
        style={{
          width: '100%',
          borderRadius: 12,
          flexDirection: 'row',
          backgroundColor: colors.white,
          marginVertical: 8,
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 48,
              width: 4,
              marginLeft: 22,
              backgroundColor: warningColor,
            }}
          />
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                marginLeft: 15,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: colors.blackTxt,
                  fontFamily: '',
                  textAlign: 'left',
                }}>
                {item?.vehicleName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={item?.fuelPipeIcon}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 7,
                    alignSelf: 'center',
                  }}
                />
                <Image
                  source={item?.fuelIcon}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                marginLeft: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: colors.blackTxt,
                  textAlign: 'left',
                }}>
                {item?.vINumber}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  source={Icon.charger}
                  style={{
                    height: 16,
                    width: 16,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: colors.runningBg,
                    textAlign: 'right',
                    alignSelf: 'center',
                    marginLeft: 3,
                  }}>
                  {item?.fuelV}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              height: 56,
              width: 72,
              borderRadius: 8,
              marginLeft: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: warningColor,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.white,
                textAlign: 'center',
              }}>
              {item?.carType}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: colors.white,
                textAlign: 'center',
              }}>
              {item?.carRunningTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={style.safeAreaView}>
      <CustomStatusBar color={colors.activeIconColor} />
      <Header
        isHideSearchBell={true}
        headerText="Tracksphere"
        searchBtn={handleSearchIconPress}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgColor,
          paddingTop: 10,
        }}>
        <ScrollView ref={scrollRef}>
          <TrackVehicle />
          <SearchVehicle
            textInputRef={textInputRef}
            inputValue={handleSearch}
          />
          <FlatList
            data={vehicleListData}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
            }}
            renderItem={renderVehicleList}
            ListEmptyComponent={() =>
              vehicleListData.length < 1 && renderEmptyView()
            }
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VehicleList;
