import { RuleTester } from '../../eslint-compat'
import rule from '../../../lib/rules/no-ref-as-operand'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

tester.run('no-ref-as-operand (Pinia storeToRefs)', rule, {
  valid: [
    `
      function storeToRefs(store) { return store }
      const { loggedIn } = storeToRefs(useAuthStore())
      if (loggedIn) {}
    `
  ],
  invalid: [
    {
      code: `
        import { storeToRefs } from 'pinia'
        const { loggedIn } = storeToRefs(useAuthStore())
        if (loggedIn) {}
      `,
      output: `
        import { storeToRefs } from 'pinia'
        const { loggedIn } = storeToRefs(useAuthStore())
        if (loggedIn.value) {}
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          data: { method: 'storeToRefs' }
        }
      ]
    }
  ]
})
