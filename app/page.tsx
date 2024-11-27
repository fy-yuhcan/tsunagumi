'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, MapPin, Utensils, Building } from 'lucide-react'

interface DetailItem {
  id: string
  name: string
  description: string
}

export default function PlanDetails() {
  const [touristSpots, setTouristSpots] = useState<DetailItem[]>([])
  const [foodShoppingSpots, setFoodShoppingSpots] = useState<DetailItem[]>([])
  const [accommodations, setAccommodations] = useState<DetailItem[]>([])

  const addItem = (category: 'tourist' | 'foodShopping' | 'accommodation') => {
    const newItem: DetailItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
    }
    switch (category) {
      case 'tourist':
        setTouristSpots([...touristSpots, newItem])
        break
      case 'foodShopping':
        setFoodShoppingSpots([...foodShoppingSpots, newItem])
        break
      case 'accommodation':
        setAccommodations([...accommodations, newItem])
        break
    }
  }

  const updateItem = (
    category: 'tourist' | 'foodShopping' | 'accommodation',
    id: string,
    field: 'name' | 'description',
    value: string
  ) => {
    const updateState = (prevState: DetailItem[]) =>
      prevState.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )

    switch (category) {
      case 'tourist':
        setTouristSpots(updateState)
        break
      case 'foodShopping':
        setFoodShoppingSpots(updateState)
        break
      case 'accommodation':
        setAccommodations(updateState)
        break
    }
  }

  const renderDetailCards = (
    items: DetailItem[],
    category: 'tourist' | 'foodShopping' | 'accommodation'
  ) => (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>
              <Input
                placeholder={`名前を入力`}
                value={item.name}
                onChange={(e) =>
                  updateItem(category, item.id, 'name', e.target.value)
                }
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`詳細を入力`}
              value={item.description}
              onChange={(e) =>
                updateItem(category, item.id, 'description', e.target.value)
              }
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary underline decoration-wavy decoration-primary underline-offset-8">
        旅行プラン詳細
      </h1>
      <Tabs defaultValue="tourist" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tourist" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            観光地
          </TabsTrigger>
          <TabsTrigger value="foodShopping" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            グルメ・ショッピング
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            宿
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tourist">
          <Card>
            <CardHeader>
              <CardTitle>観光地</CardTitle>
              <CardDescription>訪れたい観光スポットを追加しましょう。</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDetailCards(touristSpots, 'tourist')}
            </CardContent>
            <CardFooter>
              <Button onClick={() => addItem('tourist')} variant="outline" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                観光地を追加
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="foodShopping">
          <Card>
            <CardHeader>
              <CardTitle>グルメ・ショッピング</CardTitle>
              <CardDescription>食事やショッピングのスポットを追加しましょう。</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDetailCards(foodShoppingSpots, 'foodShopping')}
            </CardContent>
            <CardFooter>
              <Button onClick={() => addItem('foodShopping')} variant="outline" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                グルメ・ショッピングスポットを追加
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="accommodation">
          <Card>
            <CardHeader>
              <CardTitle>宿</CardTitle>
              <CardDescription>宿泊先の情報を追加しましょう。</CardDescription>
            </CardHeader>
            <CardContent>
              {renderDetailCards(accommodations, 'accommodation')}
            </CardContent>
            <CardFooter>
              <Button onClick={() => addItem('accommodation')} variant="outline" className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                宿を追加
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


