export default () => ({
    isLoad: true,
    usercount: 40 + (Math.random() * 30),
    city: 70 + (Math.random() * 30),
    description: 250 + (Math.random() * 150),
    tags: ((length) => {
            let allWidth = 820
            return Array(length).fill(1).map((_, i) => {
              const fakeWidth = (i*3)+(Math.random()*30) + ((allWidth/100)*15)
              allWidth -= fakeWidth
              return {
                doll: true,
                fakeWidth
              }
            })
         })(4 + Math.random() * 2 | 0)
})
