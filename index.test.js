const strictlyValidEmail = require('./index')

/* 合法邮箱 */
test('合法邮箱-基础格式', () => {
    expect(strictlyValidEmail(`simple@example.com`)).toBe(true)
})
test('合法邮箱-域内部分-包含符号：.', () => {
  expect(strictlyValidEmail(`very.common@example.com`)).toBe(true)
})
test('合法邮箱-域内部分-包含符号：+', () => {
  expect(strictlyValidEmail(`disposable.style.email.with+symbol@example.com`)).toBe(true)
})
test('合法邮箱-域内部分-包含符号：.-', () => {
  expect(strictlyValidEmail(`other.email-with-hyphen@example.com`)).toBe(true)
})
test('合法邮箱-域内部分-包含符号：-', () => {
  expect(strictlyValidEmail(`fully-qualified-domain@example.com`)).toBe(true)
})
test('合法邮箱-域内部分-包含符号：.+', () => {
  expect(strictlyValidEmail(`user.name+tag+sorting@example.com`)).toBe(true)
})
test('合法邮箱-域内部分-只有一个字符', () => {
  expect(strictlyValidEmail(`x@example.com`)).toBe(true)
})
test('合法邮箱-域名部分-包含符号：-', () => {
  expect(strictlyValidEmail(`example-indeed@strange-example.com`)).toBe(true)
})
test('合法邮箱-域名部分-无顶级域名', () => {
  expect(strictlyValidEmail(`admin@mailserver1`)).toBe(true)
})
test('合法邮箱-域内部分-包含引号 引号内有两个空格', () => {
  expect(strictlyValidEmail(`" "@example.org`)).toBe(true)
})
test('合法邮箱-域内部分-包含引号 引号内有连续的两个点', () => {
  expect(strictlyValidEmail(`"john..doe"@example.org`)).toBe(true)
})

/* 非法邮箱 */
test('非法邮箱-没有@字符', ()=> {
  expect(strictlyValidEmail(`Abc.example.com`)).toBe(false)
})
test('非法邮箱-在引号外只允许有一个@', ()=> {
  expect(strictlyValidEmail(`A@b@c@example.com`)).toBe(false)
})
test('非法邮箱-域内部分所有的特殊字符，都不允许出现在引号外', ()=> {
  expect(strictlyValidEmail(`a"b(c)d,e:f;g<h>i[j\k]l@example.com`)).toBe(false)
})
test('非法邮箱-引号中的字符串必须是点分隔的，或者是组成域内部分的唯一元素', ()=> {
  expect(strictlyValidEmail(`just"not"right@example.com`)).toBe(false)
})
test('非法邮箱-空格、引号和反斜线，只能存在于引号中，并且前面要有一个反斜线', ()=> {
  expect(strictlyValidEmail(`this is"not\allowed@example.com`)).toBe(false)
})
test('非法邮箱-即使在前面加了一个反斜线，空格、引号和反斜线仍然必须包含在引号中', ()=> {
  expect(strictlyValidEmail(`this\ still\"not\\allowed@example.com`)).toBe(false)
})
test('非法邮箱-域内部分超过64个字符', ()=> {
  expect(strictlyValidEmail(`1234567890123456789012345678901234567890123456789012345678901234+x@example.com`)).toBe(false)
})
test('非法邮箱-@之前有两个连续的点', ()=> {
  expect(strictlyValidEmail(`john..doe@example.com`)).toBe(false)
})
test('非法邮箱-@之后有两个连续的点', ()=> {
  expect(strictlyValidEmail(`john.doe@example..com`)).toBe(false)
})