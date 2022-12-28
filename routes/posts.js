const express = require('express');
const Posts = require('../schemas/posts');

const router = express.Router();

// 게시글 작성 API
router.post('/', async (req, res) => {
  const {user, password, title, content} = req.body;

  if (!(user && password && title && content)) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.'});
    return;
  }

  await Posts.create({user, password, title, content});

  res.status(201).json({ message: '게시글을 생성하였습니다.' });
});

// 게시글 조회 API
router.get('/', async (req, res) => {
  const data = await Posts.find();
  const result = data.map((lookUp) => {
    const postData = {
      postid: lookUp.id,
      user: lookUp.user,
      title: lookUp.title,
      createdAt: lookUp.createdAt,
    };
    return postData;
  }).sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json({ data: result });
});

// 게시글 상세 조회 API
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const existsPosts = await Posts.find({ _id: postId });
    const result = existsPosts.map((detail) => {
      const postData = {
        postId: detail.id,
        user: detail.user,
        title: detail.title,
        content: detail.content,
        createdAt: detail.createdAt,
      };
      return postData;
    });
    if (existsPosts.length) {
      res.status(200).json({ data: result });
    }
  } catch {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }
});

// 게시글 수정 API
router.put('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { password, title, content } = req.body;

  if (!(password && title && content)) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    return;
  }

  try {
    const existsPosts = await Posts.find({ _id: postId });
    const pwd = existsPosts.map((pw) => pw.password);

    if (existsPosts.length && String(pwd) === String(password)) {
      await Posts.updateOne({ _id: postId }, { $set: { title, content } });
      res.status(201).json({ message: '게시글을 수정하였습니다.' });
    }
  } catch {
    res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
  }
});

// 게시글 삭제 API
router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;
  if (!password) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    return;
  }

  try {
    const existsPosts = await Posts.find({ _id: postId });
    const pswrd = existsPosts.map((pw) => pw.password);

    if (existsPosts.length && String(pswrd) === String(password)) {
      await Posts.deleteOne({ _id: postId });
    }
    res.status(201).json({ message: '게시글을 삭제하였습니다.' });
  } catch {
    res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
  }
});

module.exports = router;