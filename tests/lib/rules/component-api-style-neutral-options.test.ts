import { RuleTester } from '../../eslint-compat'
import rule from '../../../lib/rules/component-api-style'
import vueEslintParser from 'vue-eslint-parser'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 2015,
    sourceType: 'module'
  }
})

tester.run('component-api-style (neutral options)', rule, {
  valid: [],
  invalid: [
    {
      filename: 'test.vue',
      code: `
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PhoneMockup'
})
</script>
`,
      options: [['script-setup']],
      errors: [
        {
          messageId: 'disallowComponentOptionPreferScriptSetup',
          data: { disallowedApi: 'Options API' }
        }
      ]
    }
  ]
})
