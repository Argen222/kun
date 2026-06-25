import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Sparkles, Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Ручное качество",
    description: "Каждое изделие тщательно изготавливается мастерами до мельчайших деталей"
  },
  {
    icon: Heart,
    title: "Индивидуальный подход",
    description: "Превращаем ваши ценные воспоминания в сияющее искусство, рассказывающее вашу историю"
  },
  {
    icon: Award,
    title: "Премиальные материалы",
    description: "Используем лучшие материалы для обеспечения долговечного качества и красоты"
  },
  {
    icon: Users,
    title: "Клиент на первом месте",
    description: "Персональная поддержка и индивидуальное обслуживание для каждого заказа"
  }
];

function AboutPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-20",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "О KUN" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: "KUN создает уникальный свет и превращает фотографии в искусство. Мы верим, что каждое воспоминание заслуживает сиять, а каждое пространство нуждается в тепле тщательно созданного света." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Наша история" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
                  /* @__PURE__ */ jsx("p", { children: "Основанная на любви к свету и воспоминаниям, KUN родилась из идеи, что освещение должно не просто давать свет, но вдохновлять, успокаивать и сохранять самые ценные моменты." }),
                  /* @__PURE__ */ jsx("p", { children: "Наше название KUN ассоциируется с солнцем, теплом, светом и уютом. Как солнце дарит жизнь и энергию, наши изделия приносят тепло и индивидуальность в каждое пространство, где они находятся." }),
                  /* @__PURE__ */ jsx("p", { children: "Каждое изделие в нашей коллекции тщательно изготавливается вручную с использованием премиальных материалов и инновационных технологий. Наша технология литофании превращает ваши фотографии в трехмерное искусство, которое оживает при освещении." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              className: "relative aspect-square rounded-2xl overflow-hidden",
              style: {
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)",
                boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.2)"
              },
              children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-12", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    boxShadow: [
                      "0 0 60px rgba(255, 179, 71, 0.4)",
                      "0 0 100px rgba(255, 179, 71, 0.6)",
                      "0 0 60px rgba(255, 179, 71, 0.4)"
                    ]
                  },
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  className: "w-full h-full rounded-full bg-gradient-to-br from-accent via-primary to-accent"
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => {
          const Icon = feature.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.1 },
              className: "text-center space-y-4",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    whileHover: { scale: 1.1, rotate: 5 },
                    className: "inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20",
                    children: /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: feature.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: feature.description })
              ]
            },
            feature.title
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Наша миссия" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed", children: "Приносить тепло, красоту и индивидуальность в каждый дом через освещение и литофанию. Мы стремимся сохранять ваши самые ценные воспоминания в форме, которая будет радовать каждый день, создавая атмосферу уюта и ностальгии, которая сохранится на всю жизнь." })
        ] })
      ]
    }
  ) }) });
}
export {
  AboutPage
};