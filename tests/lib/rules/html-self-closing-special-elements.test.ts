import rule from '../../../lib/rules/html-self-closing'
import { RuleTester } from '../../eslint-compat'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: { parser: vueEslintParser }
})

const options = [
  {
    html: {
      normal: 'never',
      void: 'never',
      component: 'always'
    }
  }
] as const

tester.run('html-self-closing (Vue special elements)', rule as RuleModule, {
  valid: [
    {
      code: '<template><slot /></template>',
      options
    },
    {
      code: '<template><div><template /></div></template>',
      options
    }
  ],
  invalid: [
    {
      code: '<template><slot></slot></template>',
      output: '<template><slot/></template>',
      options,
      errors: [
        {
          messageId: 'requireSelfClosing',
          data: { elementType: 'Vue.js custom components', name: 'slot' }
        }
      ]
    },
    {
      code: '<template><div><template></template></div></template>',
      output: '<template><div><template/></div></template>',
      options,
      errors: [
        {
          messageId: 'requireSelfClosing',
          data: { elementType: 'Vue.js custom components', name: 'template' }
        }
      ]
    }
  ]
})
