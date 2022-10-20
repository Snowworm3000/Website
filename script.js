

function change(){
    var in1 = document.getElementById("in1").value
    var in2 = document.getElementById("in2").value
    console.log(in1, in2)

    var mult = in1 - in2
    var mod = document.getElementById("mod");
    mod.innerHTML = `\\(1 * ${mult} = 0\\)`
    var mod2 = document.getElementById("mod2");
    mod2.innerHTML = `\\(${in1} - ${(in2)} = 0\\)`
    var mod3 = document.getElementById("mod3");
    mod3.innerHTML = `\\(${in1} = ${in2}\\)`

    MathJax.typesetPromise();

}

function original(){
    var mod = document.getElementById("mod");
    mod.innerHTML = `\\(1 * a = 0\\)`
    var mod2 = document.getElementById("mod2");
    mod2.innerHTML = `\\(b - c = 0\\)`
    var mod3 = document.getElementById("mod3");
    mod3.innerHTML = `\\(b = c\\)`

    MathJax.typesetPromise();
}