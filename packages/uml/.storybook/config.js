import { configure } from '@storybook/react';
import './reset.css'

configure(require.context('../src', true, /\.stories\.tsx?$/), module)
