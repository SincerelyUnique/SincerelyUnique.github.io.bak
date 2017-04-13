---
title: java8新特性学习-Lambda
date: 2017-04-12 16:34:08
tags: 
categories: Java
---
这篇博客转自网上，网址是：!(http://www.jb51.net/article/48304.htm)[http://www.jb51.net/article/48304.htm]
，首先谢谢博主，收藏一下
<!--more-->
1. 编写一个java类
```
public class Demo {

	public static void main(String[] args) {
		//Arrays.asList数组转化成list
		List<String> names = Arrays.asList("peter", "anna", "mike", "xenia");
		
		Collections.sort(names, new Comparator<String>() {
		    @Override
		    public int compare(String a, String b) {
		        return b.compareTo(a);
		    }
		});
		
		System.out.println(names);
	}
}
```
此时使用jdk7打印names会抛异常：Exception in thread "main" java.lang.UnsupportedClassVersionError；
使用jdk8则正常输出：[xenia, peter, mike, anna]

2. 传统排序和jdk8 Lambda排序
```
public class Demo{

	public static void main(String[] args) {
		//Arrays.asList数组转化成list
		List<String> names = Arrays.asList("peter", "anna", "mike", "xenia");
		
		/**
		 * jdk7排序，逆序，正序a.compareTo(b);
		 * 传统方法：使用匿名对象
		 * */
		/*Collections.sort(names, new Comparator<String>() {
		    @Override
		    public int compare(String a, String b) {
		        return b.compareTo(a);
		    }
		});*/

		/**
		 * jdk8排序，[anna, mike, peter, xenia]
		 * */
		/*Collections.sort(names, (String a,String b)->{
			return a.compareTo(b);
		});*/
		
		/**
		 * jdk8排序，[xenia, peter, mike, anna]
		 * */
		//Collections.sort(names, (String a,String b)->b.compareTo(a));
		
		/**
		 * jdk8排序，输出：[anna, mike, peter, xenia]
		 * */
		Collections.sort(names, (a,b)->a.compareTo(b));
		
		System.out.println(names);
	}
}
```

3. 什么是函数式接口，即只包含一个抽象方法的接口类型，我们只需要在定义的interface上面添加@FunctionalInterface注解即可，例子如下：
首先我们定义一个接口，注意只能包含一个抽象方法，由于注解原因，两个或两个以上方法会报编译错误：
```
@FunctionalInterface
public interface Converter<F,T> {
	T convert(F from);
}
```
然后我们定义一个一个Demo测试类作为接口的实现类（不实现也可以），主要实现数据转型：
```
public class Demo implements Converter<String, Integer>{

	public static void main(String[] args) {
		Converter<String, Integer> converter = (from) -> Integer.valueOf(from);
		Integer converted = converter.convert("123");
		System.out.println(converted);    // 打印结果是123
	}

	@Override
	public Integer convert(String from) {
		// TODO Auto-generated method stub
		return null;
	}
}
```
4. 其实java8也允许你使用 :: 关键字来传递方法或者构造函数引用，根据上面的例子可以修改成如下：
```
Converter<String, Integer> converter = Integer::valueOf;
Integer converted = converter.convert("123");
System.out.println(converted);   // 123
```
我们看一个新的例子，定义一个Person实体类，定义一个PersonFactory接口，定义一个实现类：
```
public class Person {

	String firstName;
	String lastName;

	Person() {
	}

	Person(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
```
```
public interface PersonFactory<P extends Person> {
    P create(String firstName, String lastName);
}
```
```
public class Test implements PersonFactory<Person>{

	public static void main(String[] args) {
		PersonFactory<Person> personFactory = Person::new;   //必须是实例化接口的时候才能使用::
		Person person = personFactory.create("Peter", "Parker");
		System.out.println(person);
	}

	@Override
	public Person create(String firstName, String lastName) {
		return null;
	}
}
```

5. Lambda作用域，可以直接访问外层的final修饰的局部变量（或隐性的认为不会被后续操作修改），或者实例的字段以及静态变量。
6. 访问局部变量
首先定义一个接口
```
@FunctionalInterface
public interface Converter<F, T> {

	T convert(F from);
}
```
然后
```
public class Demo{

	static int num = 1;  //前面或者加final
	
	public static void main(String[] args) {
		Converter<Integer, String> stringConverter = (from) -> String.valueOf(from + num);
		String s = stringConverter.convert(2);     // 3
		System.out.println(s);
	}
}
```

7. java8常用的一些接口
```
package com.java.demo;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Demo{

	static int num = 1;
	
	public static void main(String[] args) {
		//testPredicate();
		//testFunction();
		//testSupplier();
		//testConsumer();
		//testComparator();
	}
	
	/**
	 * Predicate 接口只有一个参数，返回boolean类型。
	 * 该接口包含多种默认方法来将Predicate组合成其他复杂的逻辑（比如：与，或，非）：
	 * */
	public static void testPredicate(){
		Predicate<String> predicate = (s) -> s.length() > 0;
		boolean b1 = predicate.test("foo");              // true
		boolean b2 = predicate.negate().test("foo");     // false
		Predicate<Boolean> nonNull = Objects::nonNull;
		Predicate<Boolean> isNull = Objects::isNull;
		Predicate<String> isEmpty = String::isEmpty;
		Predicate<String> isNotEmpty = isEmpty.negate();
	}
	
	/**
	 * Function 接口有一个参数并且返回一个结果，
	 * 并附带了一些可以和其他函数组合的默认方法（compose, andThen）：
	 * */
	public static void testFunction(){
		Function<String, Integer> toInteger = Integer::valueOf;
		Function<String, String> backToString = toInteger.andThen(String::valueOf);
		backToString.apply("123");     // "123"
	}
	
	/**
	 * Supplier 接口返回一个任意范型的值，
	 * 和Function接口不同的是该接口没有任何参数
	 * */
	public static void testSupplier(){
		Supplier<Person> personSupplier = Person::new;
		personSupplier.get();   // new Person
	}
	
	/**
	 * Consumer 接口表示执行在单个参数上的操作。
	 * */
	public static void testConsumer(){
		Consumer<Person> greeter = (p) -> System.out.println("Hello, " + p.firstName);
		greeter.accept(new Person("Luke", "Skywalker"));
	}
	
	/**
	 * Comparator 是老Java中的经典接口， 
	 * Java 8在此之上添加了多种默认方法：
	 * */
	public static void testComparator(){
		Comparator<Person> comparator = (p1, p2) -> p1.firstName.compareTo(p2.firstName);
		Person p1 = new Person("John", "Doe");
		Person p2 = new Person("Alice", "Wonderland");
		comparator.compare(p1, p2);             // > 0
		comparator.reversed().compare(p1, p2);  // < 0
	}
	
	/**
	 * Optional 不是函数是接口，这是个用来防止NullPointerException异常的辅助类型，
	 * 这是下一届中将要用到的重要概念，现在先简单的看看这个接口能干什么：
	 * Optional 被定义为一个简单的容器，其值可能是null或者不是null。
	 * 在Java 8之前一般某个函数应该返回非空对象但是偶尔却可能返回了null，
	 * 而在Java 8中，不推荐你返回null而是返回Optional。
	 * */
	public static void testOptional(){
		Optional<String> optional = Optional.of("bam");
		optional.isPresent();           // true
		optional.get();                 // "bam"
		optional.orElse("fallback");    // "bam"
		optional.ifPresent((s) -> System.out.println(s.charAt(0)));     // "b"
	}
	
	/**
	 * java.util.Stream 表示能应用在一组元素上一次执行的操作序列。
	 * Stream 操作分为中间操作或者最终操作两种，最终操作返回一特定类型的计算结果，
	 * 而中间操作返回Stream本身，这样你就可以将多个操作依次串起来。
	 * Stream 的创建需要指定一个数据源，比如 java.util.Collection的子类，List或者Set， Map不支持。
	 * Stream的操作可以串行执行或者并行执行。
	 * 
	 * Java 8扩展了集合类，
	 * 可以通过 Collection.stream() 或者 Collection.parallelStream() 来创建一个Stream。
	 * */
	public static void testStream(){
		List<String> stringCollection = new ArrayList<>();
		stringCollection.add("ddd2");
		stringCollection.add("aaa2");
		stringCollection.add("bbb1");
		stringCollection.add("aaa1");
		stringCollection.add("bbb3");
		stringCollection.add("ccc");
		stringCollection.add("bbb2");
		stringCollection.add("ddd1");
		
		/**
		 * 过滤通过一个predicate接口来过滤并只保留符合条件的元素，
		 * 该操作属于中间操作，所以我们可以在过滤后的结果来应用其他Stream操作（比如forEach）。
		 * forEach是一个最终操作，所以我们不能在forEach之后来执行其他Stream操作。
		 * */
		stringCollection.stream()
	    				.filter((s) -> s.startsWith("a"))
	    				.forEach(System.out::println);		// "aaa2", "aaa1"
		
		/**
		 * 排序是一个中间操作，返回的是排序好后的Stream。如果你不指定一个自定义的Comparator则会使用默认排序。
		 * 需要注意的是，排序只创建了一个排列好后的Stream，而不会影响原有的数据源，排序之后原数据stringCollection是不会被修改的：
		 * */
		stringCollection.stream()
	    				.sorted()
	    				.filter((s) -> s.startsWith("a"))
	    				.forEach(System.out::println);		// "aaa1", "aaa2"
		
		/**
		 * 中间操作map会将元素根据指定的Function接口来依次将元素转成另外的对象，
		 * 下面的示例展示了将字符串转换为大写字符串。
		 * 你也可以通过map来讲对象转换成其他类型，map返回的Stream类型是根据你map传递进去的函数的返回值决定的。
		 * */
		stringCollection.stream()
	    				.map(String::toUpperCase)
	    				.sorted((a, b) -> b.compareTo(a))
	    				.forEach(System.out::println); 		//// "DDD2", "DDD1", "CCC", "BBB3", "BBB2", "AAA2", "AAA1"

		/**
		 * Stream提供了多种匹配操作，允许检测指定的Predicate是否匹配整个Stream。
		 * 所有的匹配操作都是最终操作，并返回一个boolean类型的值。
		 * */
		boolean anyStartsWithA = stringCollection.stream().anyMatch(
				(s) -> s.startsWith("a"));
		System.out.println(anyStartsWithA); // true
		boolean allStartsWithA = stringCollection.stream().allMatch(
				(s) -> s.startsWith("a"));
		System.out.println(allStartsWithA); // false
		boolean noneStartsWithZ = stringCollection.stream().noneMatch(
				(s) -> s.startsWith("z"));
		System.out.println(noneStartsWithZ); // true
		
		/**
		 * 计数是一个最终操作，返回Stream中元素的个数，返回值类型是long。
		 * */
		long startsWithB = stringCollection.stream()
				.filter((s) -> s.startsWith("b")).count();
		System.out.println(startsWithB); // 3
		
		/**
		 * 这是一个最终操作，允许通过指定的函数来讲stream中的多个元素规约为一个元素，
		 * 规越后的结果是通过Optional接口表示的：
		 * */
		Optional<String> reduced = stringCollection.stream().sorted()
				.reduce((s1, s2) -> s1 + "#" + s2);
		reduced.ifPresent(System.out::println);		// "aaa1#aaa2#bbb1#bbb2#bbb3#ccc#ddd1#ddd2"
	
		/**
		 * 前面提到过Stream有串行和并行两种，
		 * 串行Stream上的操作是在一个线程中依次完成，
		 * 而并行Stream则是在多个线程上同时执行。
		 * 下面的例子展示了是如何通过并行Stream来提升性能：首先我们创建一个没有重复元素的大表：
		 * 然后我们计算一下排序这个Stream要耗时多久，串行排序：
		 * */
		int max = 1000000;
		List<String> values = new ArrayList<>(max);
		for (int i = 0; i < max; i++) {
			UUID uuid = UUID.randomUUID();
			values.add(uuid.toString());
		}
		//串行排序：
		long t0 = System.nanoTime();
		long count = values.stream().sorted().count();
		System.out.println(count);
		long t1 = System.nanoTime();
		long millis = TimeUnit.NANOSECONDS.toMillis(t1 - t0);
		System.out.println(String.format("sequential sort took: %d ms", millis)); //串行耗时: 899 ms
		
		//并行排序：
		long t01 = System.nanoTime();
		long count1 = values.parallelStream().sorted().count();
		System.out.println(count);
		long t11 = System.nanoTime();
		long millis1 = TimeUnit.NANOSECONDS.toMillis(t1 - t0);
		System.out.println(String.format("parallel sort took: %d ms", millis)); //并行排序耗时: 472 ms
	}
	
	/**
	 * 前面提到过，Map类型不支持stream，不过Map提供了一些新的有用的方法来处理一些日常任务。
	 * */
	public static void testMapWithoutStream(){
		Map<Integer, String> map = new HashMap<>();
		for (int i = 0; i < 10; i++) {
		    //putIfAbsent 不需要我们做额外的存在性检查
			map.putIfAbsent(i, "val" + i);
			//forEach 接收一个Consumer接口来对map里的每一个键值对进行操作。
			map.forEach((id, val) -> System.out.println(val));
		}
		
		//map上的其他有用的函数：
		map.computeIfPresent(3, (num, val) -> val + num);
		map.get(3);             // val33
		map.computeIfPresent(9, (num, val) -> null);
		map.containsKey(9);     // false
		map.computeIfAbsent(23, num -> "val" + num);
		map.containsKey(23);    // true
		map.computeIfAbsent(3, num -> "bam");
		map.get(3);             // val33
		
		//Map里删除一个键值全都匹配的项：
		map.remove(3, "val3");
		map.get(3);             // val33
		map.remove(3, "val33");
		map.get(3);             // null
		
		//另外一个有用的方法：
		map.getOrDefault(42, "not found");  // not found
		
		//对Map的元素做合并
		map.merge(9, "val9", (value, newValue) -> value.concat(newValue));
		map.get(9);             // val9
		map.merge(9, "concat", (value, newValue) -> value.concat(newValue));
		map.get(9);             // val9concat
	}
	
	
}
```

9. Date API
```
	/**
	 * Clock类提供了访问当前日期和时间的方法，Clock是时区敏感的，可以用来取代 System.currentTimeMillis() 来获取当前的微秒数。
	 * 某一个特定的时间点也可以使用Instant类来表示，Instant类也可以用来创建老的java.util.Date对象。
	 * */
	public static void testClock(){
		Clock clock = Clock.systemDefaultZone();
		long millis = clock.millis();
		Instant instant = clock.instant();
		Date legacyDate = Date.from(instant);   // legacy java.util.Date
	}
```

```
	/**
	 * 在新API中时区使用ZoneId来表示。时区可以很方便的使用静态方法of来获取到。 
	 * 时区定义了到UTS时间的时间差，在Instant时间点对象到本地日期对象之间转换的时候是极其重要的。
	 * */
	public static void testTimezones(){
		System.out.println(ZoneId.getAvailableZoneIds());
		// prints all available timezone ids
		ZoneId zone1 = ZoneId.of("Europe/Berlin");
		ZoneId zone2 = ZoneId.of("Brazil/East");
		System.out.println(zone1.getRules());
		System.out.println(zone2.getRules());
		// ZoneRules[currentStandardOffset=+01:00]
		// ZoneRules[currentStandardOffset=-03:00]
	}
```

```
	/**
	 * LocalTime 定义了一个没有时区信息的时间，例如 晚上10点，或者 17:30:15。
	 * 下面的例子使用前面代码创建的时区创建了两个本地时间。
	 * 之后比较时间并以小时和分钟为单位计算两个时间的时间差：
	 * */
	public static void testLocalTime(){
		ZoneId zone1 = null;
		LocalTime now1 = LocalTime.now(zone1);
		ZoneId zone2 = null;
		LocalTime now2 = LocalTime.now(zone2);
		System.out.println(now1.isBefore(now2));  // false
		long hoursBetween = ChronoUnit.HOURS.between(now1, now2);
		long minutesBetween = ChronoUnit.MINUTES.between(now1, now2);
		System.out.println(hoursBetween);       // -3
		System.out.println(minutesBetween);     // -239
		
		//LocalTime 提供了多种工厂方法来简化对象的创建，包括解析时间字符串。
		LocalTime late = LocalTime.of(23, 59, 59);
		System.out.println(late);       // 23:59:59
		DateTimeFormatter germanFormatter =
		    DateTimeFormatter
		        .ofLocalizedTime(FormatStyle.SHORT)
		        .withLocale(Locale.GERMAN);
		LocalTime leetTime = LocalTime.parse("13:37", germanFormatter);
		System.out.println(leetTime);   // 13:37
	}
```

```
	/**
	 * LocalDate 表示了一个确切的日期，比如 2014-03-11。
	 * 该对象值是不可变的，用起来和LocalTime基本一致。
	 * 下面的例子展示了如何给Date对象加减天/月/年。
	 * 另外要注意的是这些对象是不可变的，操作返回的总是一个新实例。
	 * */
	public static void testLocalDate(){
		LocalDate today = LocalDate.now();
		LocalDate tomorrow = today.plus(1, ChronoUnit.DAYS);
		LocalDate yesterday = tomorrow.minusDays(2);
		LocalDate independenceDay = LocalDate.of(2014, Month.JULY, 4);
		DayOfWeek dayOfWeek = independenceDay.getDayOfWeek();
		
		//从字符串解析一个LocalDate类型和解析LocalTime一样简单：
		DateTimeFormatter germanFormatter =
			    DateTimeFormatter
			        .ofLocalizedDate(FormatStyle.MEDIUM)
			        .withLocale(Locale.GERMAN);
			LocalDate xmas = LocalDate.parse("24.12.2014", germanFormatter);
			System.out.println(xmas);   // 2014-12-24
	}
```

```
	/**
	 * LocalDateTime 同时表示了时间和日期，相当于前两节内容合并到一个对象上了。
	 * LocalDateTime和LocalTime还有LocalDate一样，都是不可变的。
	 * LocalDateTime提供了一些能访问具体字段的方法。
	 * */
	public static void testLocalDateTime(){
		LocalDateTime sylvester = LocalDateTime.of(2014, Month.DECEMBER, 31, 23, 59, 59);
		DayOfWeek dayOfWeek = sylvester.getDayOfWeek();
		System.out.println(dayOfWeek);      // WEDNESDAY
		Month month = sylvester.getMonth();
		System.out.println(month);          // DECEMBER
		long minuteOfDay = sylvester.getLong(ChronoField.MINUTE_OF_DAY);
		System.out.println(minuteOfDay);    // 1439
		
		//只要附加上时区信息，就可以将其转换为一个时间点Instant对象，Instant时间点对象可以很容易的转换为老式的java.util.Date。
		Instant instant = sylvester
		        .atZone(ZoneId.systemDefault())
		        .toInstant();
		Date legacyDate = Date.from(instant);
		System.out.println(legacyDate);     // Wed Dec 31 23:59:59 CET 2014
		
		//格式化LocalDateTime和格式化时间和日期一样的，除了使用预定义好的格式外，我们也可以自己定义格式：
		DateTimeFormatter formatter =
			    DateTimeFormatter
			        .ofPattern("MMM dd, yyyy - HH:mm");
			LocalDateTime parsed = LocalDateTime.parse("Nov 03, 2014 - 07:13", formatter);
			String string = formatter.format(parsed);
			System.out.println(string);     // Nov 03, 2014 - 07:13
		
		//和java.text.NumberFormat不一样的是新版的DateTimeFormatter是不可变的，所以它是线程安全的。
		//关于时间日期格式的详细信息：http://download.java.net/jdk8/docs/api/java/time/format/DateTimeFormatter.html
	}
```

10. Annotation
在Java 8中支持多重注解了，先看个例子来理解一下是什么意思。
首先定义一个包装类Hints注解用来放置一组具体的Hint注解：
```
@interface Hints {
    Hint[] value();
}
@Repeatable(Hints.class)
@interface Hint {
    String value();
}
```
Java 8允许我们把同一个类型的注解使用多次，只需要给该注解标注一下@Repeatable即可。
例 1: 使用包装类当容器来存多个注解（老方法）
```
@Hints({@Hint("hint1"), @Hint("hint2")})
class Person {}
```
例 2：使用多重注解（新方法）
```
@Hint("hint1")
@Hint("hint2")
class Person {}
```
第二个例子里java编译器会隐性的帮你定义好@Hints注解，了解这一点有助于你用反射来获取这些信息：
```
Hint hint = Person.class.getAnnotation(Hint.class);
System.out.println(hint);                   // null
Hints hints1 = Person.class.getAnnotation(Hints.class);
System.out.println(hints1.value().length);  // 2
Hint[] hints2 = Person.class.getAnnotationsByType(Hint.class);
System.out.println(hints2.length);          // 2
```
即便我们没有在Person类上定义@Hints注解，我们还是可以通过 getAnnotation(Hints.class) 来获取 @Hints注解，更加方便的方法是使用 getAnnotationsByType 可以直接获取到所有的@Hint注解。
另外Java 8的注解还增加到两种新的target上了：
```
@Target({ElementType.TYPE_PARAMETER, ElementType.TYPE_USE})
@interface MyAnnotation {}
```
