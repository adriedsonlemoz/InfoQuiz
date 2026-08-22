import test from 'node:test';
import assert from 'node:assert/strict';
import { MODULES } from '../src/data/modules.js';
import { QUESTION_BANK } from '../src/data/questions.js';
import { COURSE_CONTENT } from '../src/data/courseContent.js';

for (const module of MODULES) {
  test(`${module.label}: banco tem 15 questões válidas e únicas`, () => {
    const questions = QUESTION_BANK[module.id];
    assert.equal(questions.length, 15);
    assert.equal(new Set(questions.map((item) => item.q)).size, 15);

    for (const question of questions) {
      assert.equal(question.o.length, 4);
      assert.equal(new Set(question.o).size, 4);
      assert.equal(question.o.filter((option) => option === question.c).length, 1);
      assert.ok(question.q.length >= 12);
      assert.ok(question.d.length >= 35);
    }
  });

  test(`${module.label}: material de estudo está completo`, () => {
    const lesson = COURSE_CONTENT[module.id];
    assert.ok(lesson);
    assert.ok(lesson.intro.length >= 100);
    assert.ok(Array.isArray(lesson.secoes));
    assert.ok(lesson.secoes.length >= 3);
    assert.ok(lesson.secoes.every((section) => section.titulo && section.texto.length >= 100));
    assert.ok(lesson.tutorial?.titulo);
    assert.ok(lesson.tutorial?.passos?.length >= 4);
  });
}

test('o banco completo possui 180 questões', () => {
  const total = Object.values(QUESTION_BANK).reduce((sum, questions) => sum + questions.length, 0);
  assert.equal(total, 180);
});
