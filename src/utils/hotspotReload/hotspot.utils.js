function sha1(msg) {
  // constants
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

  // PREPROCESSING
  msg += String.fromCharCode(0x80);  // add trailing '1' bit to string

  // convert string msg into 512-bit/16-integer blocks arrays of ints
  var l = Math.ceil(msg.length/4) + 2;  // long enough to contain msg plus 2-word length
  var N = Math.ceil(l/16);              // in N 16-int blocks
  var M = new Array(N);

  for (var i=0; i<N; i++) {
      M[i] = new Array(16);
      for (var j=0; j<16; j++)  // encode 4 chars per integer, big-endian encoding
          M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
      // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
  }

  // add length (in bits) into final pair of 32-bit integers (big-endian)
  // note: most significant word would be ((len-1)*8 >>> 32, but since JS converts
  // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
  M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
  M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

  // set initial hash value
  var H0 = 0x67452301;
  var H1 = 0xefcdab89;
  var H2 = 0x98badcfe;
  var H3 = 0x10325476;
  var H4 = 0xc3d2e1f0;

  // HASH COMPUTATION
  var W = new Array(80);
  var a, b, c, d, e;

  for (var i=0; i<N; i++) {
      // 1 - prepare message schedule 'W'
      for (var t=0;  t<16; t++) W[t] = M[i][t];
      for (var t=16; t<80; t++) {
          W[t] = W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16];
          W[t] = (W[t] << 1) | (W[t]>>>31);
      }

      // 2 - initialise five working variables a, b, c, d, e with previous hash value
      a = H0; b = H1; c = H2; d = H3; e = H4;

      // 3 - main loop
      for (var t=0; t<80; t++) {
          var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
          var T = ((a<<5) | (a>>>27)) + e + K[s] + W[t];
          switch(s) {
          case 0: T += (b & c) ^ (~b & d); break;          // Ch()
          case 1: T += b ^ c ^ d; break;                   // Parity()
          case 2: T += (b & c) ^ (b & d) ^ (c & d); break; // Maj()
          case 3: T += b ^ c ^ d; break;                   // Parity()
          }
          e = d;
          d = c;
          c = (b << 30) | (b>>>2);
          b = a;
          a = T;
      }

      // 4 - compute the new intermediate hash value
      H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
      H1 = (H1+b) & 0xffffffff;
      H2 = (H2+c) & 0xffffffff;
      H3 = (H3+d) & 0xffffffff;
      H4 = (H4+e) & 0xffffffff;
  }

  var hex = "";
  for (var i=7; i>=0; i--) { var v = (H0>>>(i*4)) & 0xf; hex += v.toString(16); }
  for (var i=7; i>=0; i--) { var v = (H1>>>(i*4)) & 0xf; hex += v.toString(16); }
  for (var i=7; i>=0; i--) { var v = (H2>>>(i*4)) & 0xf; hex += v.toString(16); }
  for (var i=7; i>=0; i--) { var v = (H3>>>(i*4)) & 0xf; hex += v.toString(16); }
  for (var i=7; i>=0; i--) { var v = (H4>>>(i*4)) & 0xf; hex += v.toString(16); }
  return hex;
}

var RSAPublicKey = function($modulus, $encryptionExponent) {
this.modulus = new BigInteger(Hex.encode($modulus), 16);
this.encryptionExponent = new BigInteger(Hex.encode($encryptionExponent), 16);
}

var UTF8 = {
encode: function($input) {
    $input = $input.replace(/\r\n/g,"\n");
    var $output = "";
    for (var $n = 0; $n < $input.length; $n++) {
        var $c = $input.charCodeAt($n);
        if ($c < 128) {
            $output += String.fromCharCode($c);
        } else if (($c > 127) && ($c < 2048)) {
            $output += String.fromCharCode(($c >> 6) | 192);
            $output += String.fromCharCode(($c & 63) | 128);
        } else {
            $output += String.fromCharCode(($c >> 12) | 224);
            $output += String.fromCharCode((($c >> 6) & 63) | 128);
            $output += String.fromCharCode(($c & 63) | 128);
        }
    }
    return $output;
},
decode: function($input) {
    var $output = "";
    var $i = 0;
    var $c = $c1 = $c2 = 0;
    while ( $i < $input.length ) {
        $c = $input.charCodeAt($i);
        if ($c < 128) {
            $output += String.fromCharCode($c);
            $i++;
        } else if(($c > 191) && ($c < 224)) {
            $c2 = $input.charCodeAt($i+1);
            $output += String.fromCharCode((($c & 31) << 6) | ($c2 & 63));
            $i += 2;
        } else {
            $c2 = $input.charCodeAt($i+1);
            $c3 = $input.charCodeAt($i+2);
            $output += String.fromCharCode((($c & 15) << 12) | (($c2 & 63) << 6) | ($c3 & 63));
            $i += 3;
        }
    }
    return $output;
}
};

var Base64 = {
base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode: function($input) {
    if (!$input) {
        return false;
    }
    //$input = UTF8.encode($input);
    var $output = "";
    var $chr1, $chr2, $chr3;
    var $enc1, $enc2, $enc3, $enc4;
    var $i = 0;
    do {
        $chr1 = $input.charCodeAt($i++);
        $chr2 = $input.charCodeAt($i++);
        $chr3 = $input.charCodeAt($i++);
        $enc1 = $chr1 >> 2;
        $enc2 = (($chr1 & 3) << 4) | ($chr2 >> 4);
        $enc3 = (($chr2 & 15) << 2) | ($chr3 >> 6);
        $enc4 = $chr3 & 63;
        if (isNaN($chr2)) $enc3 = $enc4 = 64;
        else if (isNaN($chr3)) $enc4 = 64;
        $output += this.base64.charAt($enc1) + this.base64.charAt($enc2) + this.base64.charAt($enc3) + this.base64.charAt($enc4);
    } while ($i < $input.length);
    return $output;
},
decode: function($input) {
    if(!$input) return false;
    $input = $input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    var $output = "";
    var $enc1, $enc2, $enc3, $enc4;
    var $i = 0;
    do {
        $enc1 = this.base64.indexOf($input.charAt($i++));
        $enc2 = this.base64.indexOf($input.charAt($i++));
        $enc3 = this.base64.indexOf($input.charAt($i++));
        $enc4 = this.base64.indexOf($input.charAt($i++));
        $output += String.fromCharCode(($enc1 << 2) | ($enc2 >> 4));
        if ($enc3 != 64) $output += String.fromCharCode((($enc2 & 15) << 4) | ($enc3 >> 2));
        if ($enc4 != 64) $output += String.fromCharCode((($enc3 & 3) << 6) | $enc4);
    } while ($i < $input.length);
    return $output; //UTF8.decode($output);
}
};

var Hex = {
hex: "0123456789abcdef",
encode: function($input) {
    if(!$input) return false;
    var $output = "";
    var $k;
    var $i = 0;
    do {
        $k = $input.charCodeAt($i++);
        $output += this.hex.charAt(($k >> 4) &0xf) + this.hex.charAt($k & 0xf);
    } while ($i < $input.length);
    return $output;
},
decode: function($input) {
    if(!$input) return false;
    $input = $input.replace(/[^0-9abcdef]/g, "");
    var $output = "";
    var $i = 0;
    do {
        $output += String.fromCharCode(((this.hex.indexOf($input.charAt($i++)) << 4) & 0xf0) | (this.hex.indexOf($input.charAt($i++)) & 0xf));
    } while ($i < $input.length);
    return $output;
}
};

var ASN1Data = function($data) {
this.error = false;
this.parse = function($data) {
    if (!$data) {
        this.error = true;
        return null;
    }
    var $result = [];
    while($data.length > 0) {
        // get the tag
        var $tag = $data.charCodeAt(0);
        $data = $data.substr(1);
        // get length
        var $length = 0;
        // ignore any null tag
        if (($tag & 31) == 0x5) $data = $data.substr(1);
        else {
            if ($data.charCodeAt(0) & 128) {
                var $lengthSize = $data.charCodeAt(0) & 127;
                $data = $data.substr(1);
                if($lengthSize > 0) $length = $data.charCodeAt(0);
                if($lengthSize > 1)    $length = (($length << 8) | $data.charCodeAt(1));
                if($lengthSize > 2) {
                    this.error = true;
                    return null;
                }
                $data = $data.substr($lengthSize);
            } else {
                $length = $data.charCodeAt(0);
                $data = $data.substr(1);
            }
        }
        // get value
        var $value = "";
        if($length) {
            if ($length > $data.length){
                this.error = true;
                return null;
            }
            $value = $data.substr(0, $length);
            $data = $data.substr($length);
        }
        if ($tag & 32)
            $result.push(this.parse($value)); // sequence
        else
            $result.push(this.value(($tag & 128) ? 4 : ($tag & 31), $value));
    }
    return $result;
};
this.value = function($tag, $data) {
    if ($tag == 1)
        return $data ? true : false;
    else if ($tag == 2) //integer
        return $data;
    else if ($tag == 3) //bit string
        return this.parse($data.substr(1));
    else if ($tag == 5) //null
        return null;
    else if ($tag == 6){ //ID
        var $res = [];
        var $d0 = $data.charCodeAt(0);
        $res.push(Math.floor($d0 / 40));
        $res.push($d0 - $res[0]*40);
        var $stack = [];
        var $powNum = 0;
        var $i;
        for($i=1;$i<$data.length;$i++){
            var $token = $data.charCodeAt($i);
            $stack.push($token & 127);
            if ( $token & 128 )
                $powNum++;
            else {
                var $j;
                var $sum = 0;
                for($j=0;$j<$stack.length;$j++)
                    $sum += $stack[$j] * Math.pow(128, $powNum--);
                $res.push($sum);
                $powNum = 0;
                $stack = [];
            }
        }
        return $res.join(".");
    }
    return null;
}
this.data = this.parse($data);
};

var RSA = {
getPublicKey: function($pem) {
    if($pem.length<50) return false;
    if($pem.substr(0,26)!="-----BEGIN PUBLIC KEY-----") return false;
    $pem = $pem.substr(26);
    if($pem.substr($pem.length-24)!="-----END PUBLIC KEY-----") return false;
    $pem = $pem.substr(0,$pem.length-24);
    $pem = new ASN1Data(Base64.decode($pem));
    if($pem.error) return false;
    $pem = $pem.data;
    if($pem[0][0][0]=="1.2.840.113549.1.1.1")
        return new RSAPublicKey($pem[0][1][0][0], $pem[0][1][0][1]);
    return false;
},
encrypt: function($data, $pubkey) {
    if (!$pubkey) return false;
    var bytes = ($pubkey.modulus.bitLength()+7)>>3;
    $data = this.pkcs1pad2($data,bytes);
    if(!$data) return false;
    $data = $data.modPowInt($pubkey.encryptionExponent, $pubkey.modulus);
    if(!$data) return false;
    $data = $data.toString(16);
    while ($data.length < bytes*2)
        $data = '0' + $data;
    return Base64.encode(Hex.decode($data));
},
pkcs1pad2: function($data, $keysize) {
    if($keysize < $data.length + 11)
        return null;
    var $buffer = [];
    var $i = $data.length - 1;
    while($i >= 0 && $keysize > 0)
        $buffer[--$keysize] = $data.charCodeAt($i--);
    $buffer[--$keysize] = 0;
    while($keysize > 2)
        $buffer[--$keysize] = Math.floor(Math.random()*254) + 1;
    $buffer[--$keysize] = 2;
    $buffer[--$keysize] = 0;
    return new BigInteger($buffer);
}
}

const getEncryptedPayload = (username, password) => {
  const resultEncryptedData = Base64.encode(sha1(username + ' ') + (new Date().getTime()))
  const encodedResult = encodeURIComponent(resultEncryptedData);
  return `irstoken=+&data=${encodedResult}&username=${username}&password=${password}`;  
};

module.exports = {
  getEncryptedPayload,
}