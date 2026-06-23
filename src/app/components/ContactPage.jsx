import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Clock, Instagram, MessageCircle, Send } from "lucide-react";

function ContactPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-12",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Свяжитесь с нами" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Есть вопросы или хотите создать что-то особенное? Мы готовы помочь воплотить ваши идеи в жизнь." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Контактная информация" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    whileHover: { x: 4 },
                    className: "flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Наш адрес" }),
                        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "г. Ош, ул. Осконалиева 1" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    whileHover: { x: 4 },
                    className: "flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Электронная почта" }),
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: "mailto:azamatovargen12@gmail.com",
                            className: "text-muted-foreground hover:text-primary transition-colors",
                            children: "azamatovargen12@gmail.com"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    whileHover: { x: 4 },
                    className: "flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Телефон" }),
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: "tel:+996770150025",
                            className: "text-muted-foreground hover:text-primary transition-colors",
                            children: "+996 770 150 025"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    whileHover: { x: 4 },
                    className: "flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1", children: "Часы работы" }),
                        /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground space-y-1", children: [
                          /* @__PURE__ */ jsx("p", { children: "Понедельник - Пятница: 09:00 - 18:00" }),
                          /* @__PURE__ */ jsx("p", { children: "Суббота: 10:00 - 16:00" }),
                          /* @__PURE__ */ jsx("p", { children: "Воскресенье: Выходной" })
                        ] })
                      ] })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Следите за нами в соцсетях" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    whileHover: { scale: 1.1, y: -2 },
                    href: "https://instagram.com",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "p-4 rounded-xl bg-muted hover:bg-primary/20 transition-colors",
                    children: /* @__PURE__ */ jsx(Instagram, { className: "w-6 h-6" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    whileHover: { scale: 1.1, y: -2 },
                    href: "https://wa.me/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "p-4 rounded-xl bg-muted hover:bg-primary/20 transition-colors",
                    children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    whileHover: { scale: 1.1, y: -2 },
                    href: "https://t.me/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "p-4 rounded-xl bg-muted hover:bg-primary/20 transition-colors",
                    children: /* @__PURE__ */ jsx(Send, { className: "w-6 h-6" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "rounded-2xl overflow-hidden h-64 bg-muted",
                style: {
                  background: "linear-gradient(135deg, rgba(212, 165, 116, 0.2) 0%, rgba(255, 179, 71, 0.2) 100%)"
                },
                children: /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "w-12 h-12 text-primary" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2 },
              className: "bg-card border border-border rounded-2xl p-8 space-y-6",
              style: {
                boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.1)"
              },
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Напишите нам" }),
                /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "firstName", className: "text-sm font-medium", children: "Ваше имя" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "firstName",
                          type: "text",
                          placeholder: "Например, Али",
                          className: "w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "lastName", className: "text-sm font-medium", children: "Ваша фамилия" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "lastName",
                          type: "text",
                          placeholder: "Например, Асанов",
                          className: "w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Электронная почта" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "email",
                        type: "email",
                        placeholder: "example@mail.kg",
                        className: "w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "subject", className: "text-sm font-medium", children: "Тема" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "subject",
                        type: "text",
                        placeholder: "Чем можем помочь?",
                        className: "w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "text-sm font-medium", children: "Сообщение" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        id: "message",
                        rows: 6,
                        placeholder: "Опишите подробнее ваш проект или вопрос...",
                        className: "w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      type: "submit",
                      className: "w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg",
                      children: "Отправить сообщение"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  ContactPage
};