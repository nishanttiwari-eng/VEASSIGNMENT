import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

  console.log('asasasasas::', carTypeSummary);

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
function SearchVehicle({textInputRef, inputValue, defaultValue}) {
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
          maxLength={12}
          onChangeText={inputValue}
          defaultValue={defaultValue}
          returnKeyType="done"
          keyboardType="email-address"
          editable={false}
          placeholderTextColor={colors.inActiveIconColor}
          style={{
            borderRadius: 8,
            width: '85%',
            height: 40,
            textAlign: 'left',
            color: colors.inActiveIconColor,
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
const VehicleDetail = props => {
  const validProp =
    props.route.params && props.route.params != '' ? props.route.params : '';
  const validVehicleDetail =
    validProp.item && validProp.item != '' ? validProp.item : '';

  // Create Reference
  const textInputRef = useRef(null);
  const scrollRef = useRef(null);

  // Use State
  const [showDetail, setShowDetail] = useState(false);

  let warningColor;

  if (validVehicleDetail?.carType === 'Running') {
    warningColor = colors.runningBg;
  } else if (validVehicleDetail?.carType === 'Idle') {
    warningColor = colors.yellowTxt;
  } else if (validVehicleDetail?.carType === 'Halt') {
    warningColor = colors.redTxt;
  } else if (validVehicleDetail?.carType === 'Offline') {
    warningColor = colors.blackTxt;
  }

  // Handle Scroll to top
  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true, // smooth scroll
      });
    }, []),
  );

  return (
    <SafeAreaView style={style.safeAreaView}>
      <CustomStatusBar color={colors.activeIconColor} />
      <Header isHideSearchBell={true} headerText="Tracksphere" />
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
            defaultValue={validVehicleDetail.vehicleName}
          />

          {/* Vehicle Detail */}
          <View
            style={{
              borderRadius: 12,
              backgroundColor: colors.white,
              paddingVertical: 10,
              marginHorizontal: '5%',
              marginVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Icon.majorIssue}
                  resizeMode="center"
                  style={{
                    width: 20,
                    marginHorizontal: 5,
                  }}
                />
              </View>

              <View
                style={{
                  // height: 48,
                  width: 4,
                  backgroundColor: warningColor,
                }}
              />
              <View
                style={{
                  flex: 1,
                  paddingRight: 15,
                }}>
                <TouchableOpacity
                  // onPress={hanldeVehiclePress}
                  activeOpacity={0.7}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginBottom: 8,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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
                          {validVehicleDetail?.vehicleName}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Image
                            source={validVehicleDetail?.fuelPipeIcon}
                            style={{
                              width: 20,
                              height: 20,
                              marginRight: 7,
                              alignSelf: 'center',
                            }}
                          />
                          <Image
                            source={validVehicleDetail?.fuelIcon}
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
                          {validVehicleDetail?.vINumber}
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
                            {validVehicleDetail?.fuelV}
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
                        {validVehicleDetail?.carType}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: colors.white,
                          textAlign: 'center',
                        }}>
                        {validVehicleDetail?.carRunningTime}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    height: 100,
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 15,
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: 0.9,
                    }}>
                    <Image
                      source={Icon.diesel}
                      resizeMode="contain"
                      style={{
                        width: 92,
                        height: 92,
                      }}
                    />
                    <Image
                      source={Icon.adblue}
                      resizeMode="contain"
                      style={{
                        height: 92,
                        width: 92,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={Icon.swapDriving}
                        resizeMode="contain"
                        style={{
                          height: 16,
                          width: 16,
                          marginRight: 3,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: colors.blackTxt,
                        }}>
                        {'999999'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginVertical: 10,
                      }}>
                      <Image
                        source={Icon.hourGlass}
                        resizeMode="contain"
                        style={{
                          height: 16,
                          width: 16,
                          marginRight: 3,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: colors.blackTxt,
                        }}>
                        {'9999 hrs'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={Icon.speed}
                        resizeMode="contain"
                        style={{
                          height: 16,
                          width: 16,
                          marginRight: 3,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: colors.blackTxt,
                        }}>
                        {'12 kmpl'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      width: '100%',
                      marginHorizontal: 15,
                      alignSelf: 'flex-end',
                      flex: 0.7,
                      height: 60,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        textAlign: 'left',
                        color: colors.inActiveIconColor,
                      }}>
                      {'Location :'}
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          lineHeight: 16,
                          color: colors.blueTxt,
                        }}>
                        {
                          '3rd Floor, 4/4, First Main Road, Industrial Town Rajaji Nagar…'
                        }
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        textAlign: 'left',
                        color: colors.inActiveIconColor,
                        marginTop: 10,
                      }}>
                      {'Last Updated: 14:45:00, 13 Dec’23'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      height: 60,
                      marginTop: 10,
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        textAlign: 'left',
                        marginRight: 2,
                        color: colors.activeIconColor,
                      }}>
                      {'Need Help?'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowDetail(!showDetail)}
                      style={{
                        height: 32,
                        width: 72,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.blackTxt,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          textAlign: 'left',
                          color: colors.white,
                        }}>
                        {'Details'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {showDetail && (
                  <View
                    style={{
                      width: '100%',
                      height: 400,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: colors.activeIconColor,
                      }}>
                      {'comming soon'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetail;
