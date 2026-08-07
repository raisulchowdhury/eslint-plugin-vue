import tsParser from '@typescript-eslint/parser'
import vueEslintParser from 'vue-eslint-parser'
import { RuleTester } from '../../eslint-compat'
import rule from '../../../lib/rules/no-parsing-error'

const tester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: { parser: tsParser }
  }
})

tester.run('no-parsing-error (TypeScript template assertions)', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
<script setup lang="ts">
let x: string | number = 1
</script>
<template>
  {{ (x as number).toFixed(2) }}
</template>
`
    }
  ],
  invalid: []
})
