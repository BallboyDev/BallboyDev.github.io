const fs = require('fs')
const path = require('path')
const config = require(`${process.env.PWD}/config.json`)

module.exports = core = {
    initBuild: () => {
        if (fs.existsSync(config.buildPath)) {
            fs.rmSync(config.buildPath, { recursive: true })
        }
        fs.mkdirSync(config.buildPath)
    },

    createPostData: ({ posts } = require(path.join(config.postPath, './index.json')), currentPath = []) => {
        console.log('ballboy >> createPostData()')
        const postList = []

        Object.keys(posts).map((post, i) => {
            if (typeof posts[post] === 'string') {
                postList.push({
                    type: 'item',
                    name: post,
                    href: currentPath,
                    link: posts[post].indexOf('https'),
                    key: `post-${Math.random().toString(36).substring(2, 16)}`
                })
            } else {
                postList.push({ type: 'open', name: post, key: `folder-${Math.random().toString(36).substring(2, 16)}` })
                postList.push(...core.createPostData({ posts: posts[post] }, [...currentPath, post]))
                postList.push({ type: 'close', name: post, key: `folder-${Math.random().toString(36).substring(2, 16)}` })
            }
        })

        return postList
    },

    createInfoData: () => {
        const { infos } = require(config.postInfo)

        const infoList = Object.keys(infos).map((info) => {
            return {
                type: 'info',
                name: info,
                href: [],
                key: `${info}-page`
            }
        })

        return infoList
    },

    createPageParamList: ({ postList, infoList }) => {
        console.log('ballboy >> createComponent()')
        const layouts = require(config.layouts)

        const pageParamList = []

        // navigator 코드 생성
        const navigator_html = layouts.navigator.init(postList)

        postList.map((post) => {
            if (post.type === 'item') {
                // post page 코드 생성
                const post_html = layouts.post.init(post)

                // page style 코드 생성
                const style_css = layouts.style.init(post)

                pageParamList.push({
                    ...post,
                    style: style_css,
                    navigator: navigator_html,
                    post: post_html,
                })
            }
        })

        // info page 생성
        infoList.map((info) => {
            pageParamList.push({
                ...info,
                style: `.${info.name}-page {color: pink}`,
                navigator: navigator_html,
                post: '<h1>index page</h1>'
            })
        })

        pageParamList.map((v) => {
            const { type, name, href, key, style } = v
            console.log({ type, name, href, key, style })
        })
        return pageParamList
    },

    createPage: (pageParamList) => {
        console.log('ballboy >> createPage()')
        const layouts = require(config.layouts)

        pageParamList.map((pageParam) => {
            const html = layouts.postPage.init(pageParam)

            core.createFile(pageParam, html)

        })
    },

    createFile: (pageParam, html) => {
        const buildPathType = [config.buildPath, pageParam.type === 'item' ? '_post' : '_page']
        if (!fs.existsSync(path.join(...buildPathType, ...pageParam.href))) {
            fs.mkdirSync(path.join(...buildPathType, ...pageParam.href))
        }

        fs.writeFileSync(path.join(...buildPathType, ...pageParam.href, `${pageParam.name}.html`), html)
    }
}

