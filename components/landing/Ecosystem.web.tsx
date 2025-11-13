import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

const theme = {
  card: {
    backgroundDark: '#1A1A1A',
    text: '#FFFFFF',
    textTertiary: '#CCCCCC',
  },
  text: '#111111',
  background: '#FFFFFF',
  border: '#E0E0E0',
  codeBackground: '#0D1117',
  codeHeader: '#161B22',
  codeBorder: '#30363D',
};

const EcosystemCard = ({ style, cardColor, title, text, isDark, children }) => (
  <View style={[styles.card, { backgroundColor: cardColor }, style]}>
    <Text style={[styles.cardTitle, isDark && { color: theme.card.text }]}>
      {title}
    </Text>
    <Text style={[styles.cardText, isDark && { color: theme.card.textTertiary }]}>
      {text}
    </Text>
    {children}
    <Text style={[styles.cardLink, isDark && { color: theme.card.text }]}>
      Leia mais →
    </Text>
  </View>
);

const Ecosystem = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  const newCode = `/**
 *Submitted for verification at BscScan.com on 2021-08-04
*/

/**

 * Web: https://asppibra.com.br
 *
 *
 */
pragma solidity 0.5.16;

interface IBEP20 {
  function totalSupply() external view returns (uint256);
  function decimals() external view returns (uint8);
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
  function getOwner() external view returns (address);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function allowance(address _owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Context {
  constructor () internal { }

  function _msgSender() internal view returns (address payable) {
    return msg.sender;
  }

  function _msgData() internal view returns (bytes memory) {
    this;
    return msg.data;
  }
}

library SafeMath {
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a, "SafeMath: addition overflow");
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    return sub(a, b, "SafeMath: subtraction overflow");
  }

  function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
    require(b <= a, errorMessage);
    uint256 c = a - b;
    return c;
  }

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    require(c / a == b, "SafeMath: multiplication overflow");
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    return div(a, b, "SafeMath: division by zero");
  }

  function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
    require(b > 0, errorMessage);
    uint256 c = a / b;
    return c;
  }

  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    return mod(a, b, "SafeMath: modulo by zero");
  }

  function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
    require(b != 0, errorMessage);
    return a % b;
  }
}

contract Ownable is Context {
  address private _owner;
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  constructor () internal {
    address msgSender = _msgSender();
    _owner = msgSender;
    emit OwnershipTransferred(address(0), msgSender);
  }

  function owner() public view returns (address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(_owner == _msgSender(), "Ownable: caller is not the owner");
    _;
  }

  function renounceOwnership() public onlyOwner {
    emit OwnershipTransferred(_owner, address(0));
    _owner = address(0);
  }

  function transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
  }

  function _transferOwnership(address newOwner) internal {
    require(newOwner != address(0), "Ownable: new owner is the zero address");
    emit OwnershipTransferred(_owner, newOwner);
    _owner = newOwner;
  }
}

contract BEP20Token is Context, IBEP20, Ownable {
  using SafeMath for uint256;
  mapping (address => uint256) private _balances;
  mapping (address => mapping (address => uint256)) private _allowances;
  uint256 private _totalSupply;
  uint8 private _decimals;
  string private _symbol;
  string private _name;

  constructor() public {
    _name = "ASPPIBRA";
    _symbol = "ASPPBR";
    _decimals = 18;
    _totalSupply = 21000000 * 10 ** 18;
    _balances[msg.sender] = _totalSupply;
    emit Transfer(address(0), msg.sender, _totalSupply);
  }

  function getOwner() external view returns (address) {
    return owner();
  }

  function decimals() external view returns (uint8) {
    return _decimals;
  }

  function symbol() external view returns (string memory) {
    return _symbol;
  }

  function name() external view returns (string memory) {
    return _name;
  }

  function totalSupply() external view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) external view returns (uint256) {
    return _balances[account];
  }

  function transfer(address recipient, uint256 amount) external returns (bool) {
    _transfer(_msgSender(), recipient, amount);
    return true;
  }

  function allowance(address owner, address spender) external view returns (uint256) {
    return _allowances[owner][spender];
  }

  function approve(address spender, uint256 amount) external returns (bool) {
    _approve(_msgSender(), spender, amount);
    return true;
  }

  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
    _transfer(sender, recipient, amount);
    _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
    return true;
  }

  function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
    return true;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
    _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "BEP20: decreased allowance below zero"));
    return true;
  }

  function mint(uint256 amount) public onlyOwner returns (bool) {
    _mint(_msgSender(), amount);
    return true;
  }

  function _transfer(address sender, address recipient, uint256 amount) internal {
    require(sender != address(0), "BEP20: transfer from the zero address");
    require(recipient != address(0), "BEP20: transfer to the zero address");
    _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
    _balances[recipient] = _balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
  }

  function _mint(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: mint to the zero address");
    _totalSupply = _totalSupply.add(amount);
    _balances[account] = _balances[account].add(amount);
    emit Transfer(address(0), account, amount);
  }

  function _burn(address account, uint256 amount) internal {
    require(account != address(0), "BEP20: burn from the zero address");
    _balances[account] = _balances[account].sub(amount, "BEP20: burn amount exceeds balance");
    _totalSupply = _totalSupply.sub(amount);
    emit Transfer(account, address(0), amount);
  }

  function _approve(address owner, address spender, uint256 amount) internal {
    require(owner != address(0), "BEP20: approve from the zero address");
    require(spender != address(0), "BEP20: approve to the zero address");
    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }

  function _burnFrom(address account, uint256 amount) internal {
    _burn(account, amount);
    _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "BEP20: burn amount exceeds allowance"));
  }
}`;

  const handleCopy = () => {
    if (Platform.OS === 'web') {
        const textArea = document.createElement('textarea');
        textArea.value = newCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Falha ao copiar o código: ', err);
        }
        document.body.removeChild(textArea);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tokenomics</Text>

      <View style={[styles.columnLayout, !isDesktop && styles.columnLayoutMobile]}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <EcosystemCard
            title="ASPPIBRA-DAO v 1.00"
            text="O Evergan v0.14 da Nexera é uma otimização de alta performance para dispositivos móveis, com página segura para relayers, acesso a help desk e um item avançado NRC-20 atualizável com o padrão ERC-20."
            cardColor={theme.card.backgroundDark}
            isDark
          >
            {/* Code Snippet Section */}
            <View style={styles.codeSnippetContainer}>
              <View style={styles.codeHeader}>
                <Text style={styles.codeFileName}>ASPPBR.sol</Text>
                <TouchableOpacity onPress={handleCopy}>
                   <Text style={styles.copyButtonText}>[□]</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.codeBody}>
                <Text style={styles.codeText}>
                  {newCode}
                </Text>
              </ScrollView>
            </View>
          </EcosystemCard>
        </View>

        {/* Right Column - Updated to display SVG */}
        <View style={styles.rightColumn}>
             <ExpoImage
                source={{ uri: 'https://storage.googleapis.com/nftimagebucket/bsc/tokens/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613/TVRjMU1ETTVOakV6TWc9PV8xNzYyNzE=.svg' }}
                style={styles.nftImage}
                contentFit="contain"
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60, 
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 48,
    textAlign: 'left',
  },
  columnLayout: {
    flexDirection: 'row',
    width: '100%',
    gap: 24,
    alignItems: 'stretch',
  },
  columnLayoutMobile: {
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 28,
    height: 580,
    borderWidth: 1,
    borderColor: theme.border,
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 'auto',
    paddingTop: 20,
  },
  codeSnippetContainer: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.codeBackground,
    borderWidth: 1,
    borderColor: theme.codeBorder,
    flex: 1,
    flexDirection: 'column',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.codeHeader,
    borderBottomWidth: 1,
    borderBottomColor: theme.codeBorder,
  },
  codeFileName: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#8B949E',
  },
  copyButtonText: {
      color: '#8B949E',
      fontSize: 18,
  },
  codeBody: {
    padding: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#E6EDF3',
    fontSize: 14,
  },
  nftImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});

export default Ecosystem;
