import { npmLoad, npmList } from './npmManager';

const getProblems = () => (npmLoad().then(() => npmList()));

export default getProblems;
